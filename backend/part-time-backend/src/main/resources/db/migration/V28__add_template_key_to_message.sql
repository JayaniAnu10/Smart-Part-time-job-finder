ALTER TABLE message
    ADD COLUMN template_key VARCHAR(100);

ALTER TABLE message
    ADD CONSTRAINT uk_message_template_key UNIQUE (template_key);
