package com.datascope.datascopebackend.service;

import com.datascope.datascopebackend.entity.Offer;

import java.util.List;

public interface IOfferService {
    public List<Offer> retrieveAllOffers();
    public Offer retrieveOffer(Long offerId);
    public Offer addOffer(Offer c);
    public void removeOffer(Long offerId);
    public Offer modifyOffer(Offer offer);
}
