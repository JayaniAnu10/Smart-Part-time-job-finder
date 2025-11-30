package com.smartparttime.parttimebackend.modules.User;

import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface LanguageRepository extends CrudRepository<Language, Integer> {
    Optional<Language> findByLanguageIgnoreCase(String language);
}