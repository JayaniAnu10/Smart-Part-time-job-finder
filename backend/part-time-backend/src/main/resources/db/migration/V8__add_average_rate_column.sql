alter table user
    add average_rate DECIMAL(2, 1) default 0 not null;
alter table user
    add total_ratings int default 0 not null;
