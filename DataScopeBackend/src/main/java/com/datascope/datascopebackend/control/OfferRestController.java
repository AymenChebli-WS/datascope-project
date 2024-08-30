package com.datascope.datascopebackend.control;

import com.datascope.datascopebackend.entity.AIQuery;
import com.datascope.datascopebackend.entity.User;
import com.datascope.datascopebackend.service.IAiService;
import com.datascope.datascopebackend.service.IOfferService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.datascope.datascopebackend.entity.Offer;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/offer")
public class OfferRestController {
    IOfferService offerService;
    IAiService aiService;

    // http://localhost:8089/datascope/offer/retrieve-all-offers
    @GetMapping("/retrieve-all-offers")
    public List<Offer> getOffers() {
        List<Offer> listOffers = offerService.retrieveAllOffers();
        return listOffers;
    }
    // http://localhost:8089/datascope/offer/retrieve-offer/8
    @GetMapping("/retrieve-offer/{offer-id}")
    public Offer retrieveOffer(@PathVariable("offer-id") Long chId) {
        Offer offer = offerService.retrieveOffer(chId);
        return offer;
    }
    // http://localhost:8089/datascope/offer/add-offer
    @PostMapping("/add-offer")
    public Offer addOffer(@RequestBody Map<String, String> request) {
        String textData = request.get("textData");
        String userIdStr = request.get("userId");

        if (userIdStr == null) {
            throw new IllegalArgumentException("User ID must be provided");
        }

        Long userId = Long.valueOf(userIdStr);
        String aiResponse = aiService.generateData(textData);
        System.out.println("The user id is: " + userId);

        // Parse the AI response
        ObjectMapper objectMapper = new ObjectMapper();
        Offer aiOffer = null;
        try {
            // Map JSON string to Offer object
            aiOffer = objectMapper.readValue(aiResponse, Offer.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Set Connected User
        User existingUser = new User();
        existingUser.setId(userId);
        aiOffer.setUser(existingUser);

        // Storing Offer
        System.out.println("Adding Offer: " + aiOffer);
        Offer savedOffer = offerService.addOffer(aiOffer);
        return savedOffer;
    }

    // http://localhost:8089/datascope/offer/remove-offer/{offer-id}
    @GetMapping("/delete-offer/{offer-id}")
    public ResponseEntity<Void> deleteOfferUsingGet(@PathVariable("offer-id") Long offerId) {
        offerService.removeOffer(offerId);
        return ResponseEntity.ok().build();
    }

    // http://localhost:8089/datascope/offer/modify-offer
    @PutMapping("/modify-offer")
    public Offer modifyOffer(@RequestBody Offer c) {
        Offer offer = offerService.modifyOffer(c);
        return offer;
    }

    @PostMapping("/test-ai")
    public ResponseEntity<String> generateData(@RequestBody Map<String, String> request) {
        String textData = request.get("textData");
        System.out.println("Me: "+ textData);
        String aiResponse = aiService.generateData(textData);
        System.out.println("AI: "+ aiResponse);
        return ResponseEntity.ok(aiResponse);
    }
}
