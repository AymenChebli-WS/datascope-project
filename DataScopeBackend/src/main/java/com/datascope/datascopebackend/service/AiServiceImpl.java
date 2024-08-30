package com.datascope.datascopebackend.service;

import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;

@Service
@AllArgsConstructor
public class AiServiceImpl implements IAiService{
    IOfferService offerService;
    private final String GEMINI_API_KEY = "AIzaSyBA88x7gWOLvu-sQZOwh3CQnDJop--24eA"; // Replace with your Gemini API key
    private final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";

    public String generateData(String textData) {
        //=== Setup the Rest Template for Post ===
        //Prompt Instructions
        String promptInstructions = "You'll be given a text extracted from a pdf file." +
                "It'll either be a Job or Internship offer, your task is to extract the relevant information and solely give a json file that includes the following." +
                "Do not answer with anything besides the json code. No code block markers or delimiters. The json code should be like this: " +
                "{ \"type\": (Internship or Job), \"email\": (the email of the offeror), \"enterprise\": (the offeror enterprise name), \"skills\": (a list of the required skills)," +
                "\"tasks\": (a list of the tasks that need to be accomplished) } . " +
                "This is the extracted text: ";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("contents", new JSONArray().put(new JSONObject().put("parts", new JSONArray().put(new JSONObject().put("text", promptInstructions + textData)))));
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
        String finalUrl = GEMINI_API_URL + GEMINI_API_KEY;
        ResponseEntity<String> response = restTemplate.postForEntity(finalUrl, entity, String.class);

        //=== Extract Text from Response body ===
        String extractedText = "";
        try {
            JSONObject jsonObject = new JSONObject(response.getBody());
            JSONArray candidatesArray = jsonObject.getJSONArray("candidates");
            JSONObject firstCandidate = candidatesArray.getJSONObject(0);
            JSONObject contentObject = firstCandidate.getJSONObject("content");
            JSONArray partsArray = contentObject.getJSONArray("parts");
            JSONObject firstPart = partsArray.getJSONObject(0);
            extractedText = firstPart.getString("text");
        } catch (JSONException e) {
            e.printStackTrace();
            // Handle potential parsing errors
        }

        return extractedText;
    }
}
