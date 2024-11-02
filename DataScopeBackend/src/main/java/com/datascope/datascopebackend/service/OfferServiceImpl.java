package com.datascope.datascopebackend.service;

import com.datascope.datascopebackend.entity.Offer;
import com.datascope.datascopebackend.repository.OfferRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OfferServiceImpl implements IOfferService{
    OfferRepository offerRepository;
    public List<Offer> retrieveAllOffers() {
        return offerRepository.findAll();
    }
    public Offer retrieveOffer(Long offerId) {
        return offerRepository.findById(offerId).get();
    }
    public Offer addOffer(Offer c) {
        return offerRepository.save(c);
    }
    public void removeOffer(Long offerId) {
        offerRepository.deleteById(offerId);
    }
    public Offer modifyOffer(Offer offer) {
        return offerRepository.save(offer);
    }
}
