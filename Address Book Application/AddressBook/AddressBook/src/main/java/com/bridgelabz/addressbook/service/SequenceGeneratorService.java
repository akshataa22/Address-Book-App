package com.bridgelabz.addressbook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.bridgelabz.addressbook.model.ContactDTO;

import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;


@Service
public class SequenceGeneratorService {
	@Autowired
    private MongoOperations mongoOperations;

    public SequenceGeneratorService (MongoOperations mongoOperations) {
	       this.mongoOperations = mongoOperations;
	       }



	public String generateSequence(String seqName) {
        ContactDTO counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
	             new Update().inc("seq",1), options().returnNew(true).upsert(true),
	             ContactDTO.class);
	        return counter != null ? Long.toString(counter.getSeq()) : "1";

	    }
}
