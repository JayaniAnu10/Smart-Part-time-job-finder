package com.smartparttime.parttimebackend.modules.User.repo;

import com.smartparttime.parttimebackend.modules.User.entities.Language;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface LanguageRepository extends CrudRepository<Language, Integer> {
    Optional<Language> findByLanguageIgnoreCase(String language);
}