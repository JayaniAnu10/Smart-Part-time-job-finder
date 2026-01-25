alter table promotion
    add payment_id binary(16) null;

alter table promotion
    add constraint promotion_payment_id_fk
        foreign key (payment_id) references payment (id);