alter table user
    add averageRate DECIMAL(2, 1) default 0 not null;
alter table user
    add totalRatings int default 0 not null;
