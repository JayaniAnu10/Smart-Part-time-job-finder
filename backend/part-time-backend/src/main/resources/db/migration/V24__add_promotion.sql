create table promotion_category
(
    id    int auto_increment not null
        primary key,
    name  varchar(255)   not null,
    price decimal(10, 2) not null,
    days  int            not null
);

alter table promotion
    change promotion_category category_id int null;

alter table promotion
drop foreign key promotion_job_id_fk;

alter table promotion
    add constraint promotion_job_id_fk
        foreign key (job_id) references job (id)
            on update cascade on delete cascade;

alter table promotion
    add constraint promotion_promotion_category_id_fk
        foreign key (category_id) references promotion_category (id)
            on delete set null;



