create table complaint_type
(
    id   int auto_increment
        primary key,
    type varchar(255) not null
);

create table job_category
(
    id       int auto_increment
        primary key,
    category varchar(255) not null
);

create table message
(
    id          bigint auto_increment
        primary key,
    description varchar(255) not null
);

create table promotion_category
(
    id    int auto_increment
        primary key,
    name  varchar(255)   not null,
    price decimal(10, 2) not null,
    days  int            not null
);

create table user
(
    id            binary(16)    default (uuid_to_bin(uuid())) not null
        primary key,
    email         varchar(255)                                not null,
    password      varchar(255)                                not null,
    is_verified   tinyint(1)                                  not null,
    trust_score   int           default 0                     not null,
    created_at    datetime                                    not null,
    contact       varchar(255)                                not null,
    updated_at    datetime                                    null,
    average_rate  decimal(2, 1) default 0.0                   not null,
    total_ratings int           default 0                     not null,
    is_employer   tinyint(1)    default 0                     not null,
    is_jobseeker  tinyint(1)    default 0                     not null,
    role          varchar(20)   default 'USER'                not null
);

create table complaint
(
    id          binary(16) default (uuid_to_bin(uuid())) not null
        primary key,
    reporter_id binary(16)                               not null,
    target_id   binary(16)                               not null,
    description varchar(255)                             not null,
    created_at  datetime   default (now())               not null,
    type_id     int                                      null,
    status      varchar(255)                             not null,
    constraint complaint_complaint_type_id_fk
        foreign key (type_id) references complaint_type (id),
    constraint complaint_reporter_id_fk
        foreign key (reporter_id) references user (id),
    constraint complaint_target_id_fk
        foreign key (target_id) references user (id)
);

create table employer
(
    id                   binary(16)   not null
        primary key,
    company_name         varchar(255) not null,
    company_address      varchar(255) not null,
    contact_person_name  varchar(255) not null,
    contact_person_phone varchar(255) not null,
    logo                 varchar(255) null,
    website              varchar(255) null,
    description          text         not null,
    registration_id      varchar(255) not null,
    industry             varchar(255) not null,
    constraint employer_user_id_fk
        foreign key (id) references user (id)
);

create table job
(
    id                  binary(16) default (uuid_to_bin(uuid())) not null
        primary key,
    title               varchar(255)                             not null,
    employer_id         binary(16)                               not null,
    description         longtext                                 not null,
    category_id         int                                      null,
    location            varchar(255)                             not null,
    job_type            varchar(255)                             not null,
    deadline            datetime                                 not null,
    posted_date         datetime                                 not null,
    status              varchar(255)                             not null,
    min_salary          decimal(10, 2)                           not null,
    max_salary          decimal(10, 2)                           not null,
    requirements        text                                     not null,
    accommodation       varchar(255)                             null,
    total_vacancies     bigint                                   not null,
    available_vacancies bigint                                   not null,
    embedding           text                                     null,
    latitude            double                                   not null,
    longitude           double                                   not null,
    is_urgent           tinyint(1) default 0                     null,
    required_gender     varchar(25)                              not null,
    constraint Job_Job_Category_id_fk
        foreign key (category_id) references job_category (id)
            on update cascade on delete set null,
    constraint job_employee_id_fk
        foreign key (employer_id) references employer (id)
);

create index idx_jobs_location
    on job (latitude, longitude);

create table job_schedule
(
    id               binary(16) default (uuid_to_bin(uuid())) not null
        primary key,
    job_id           binary(16)                               not null,
    start_datetime   datetime                                 not null,
    end_datetime     datetime                                 not null,
    required_workers int                                      not null,
    working_hours    int                                      not null,
    constraint job_schedule_job_id_fk
        foreign key (job_id) references job (id)
            on update cascade on delete cascade
);

create table attendance
(
    id             binary(16)   default (uuid_to_bin(uuid())) not null
        primary key,
    user_id        binary(16)                                 not null,
    job_id         binary(16)                                 not null,
    check_in_time  datetime                                   null,
    check_out_time datetime                                   null,
    qr_code        varchar(255)                               not null,
    status         varchar(255) default 'PENDING'             not null,
    schedule_id    binary(16)                                 null,
    constraint attendance_job_id_fk
        foreign key (job_id) references job (id),
    constraint attendance_job_schedule_id_fk
        foreign key (schedule_id) references job_schedule (id)
            on update cascade on delete set null,
    constraint attendance_user_id_fk
        foreign key (user_id) references user (id)
);

create table job_application
(
    id           binary(16) default (uuid_to_bin(uuid())) not null
        primary key,
    job_id       binary(16)                               not null,
    user_id      binary(16)                               not null,
    applied_date datetime                                 not null,
    status       varchar(255)                             not null,
    schedule_id  binary(16)                               null,
    constraint job_application_job_id_fk
        foreign key (job_id) references job (id),
    constraint job_application_job_schedule_id_fk
        foreign key (schedule_id) references job_schedule (id)
            on update cascade on delete cascade,
    constraint job_application_user_id_fk
        foreign key (user_id) references user (id)
);

create table job_seeker
(
    id              binary(16)   not null
        primary key,
    first_name      varchar(255) not null,
    last_name       varchar(255) not null,
    gender          varchar(255) not null,
    date_of_birth   date         not null,
    bio             text         not null,
    address         varchar(255) not null,
    profile_picture varchar(255) null,
    skills          text         null,
    nic             varchar(255) not null,
    embedding       text         null,
    constraint job_seeker_user_id_fk
        foreign key (id) references user (id)
);

create table notification
(
    id         binary(16) default (uuid_to_bin(uuid())) not null
        primary key,
    user_id    binary(16)                               not null,
    message_id bigint                                   null,
    created_at datetime   default (now())               not null,
    is_read    tinyint(1) default 0                     not null,
    constraint Notification_Message_id_fk
        foreign key (message_id) references message (id)
            on update cascade on delete set null,
    constraint notification_user_id_fk
        foreign key (user_id) references user (id)
);

create table payment
(
    id           binary(16) default (uuid_to_bin(uuid())) not null
        primary key,
    payer_id     binary(16)                               not null,
    receiver_id  binary(16)                               not null,
    payment_date datetime                                 not null,
    amount       decimal(10, 2)                           not null,
    status       varchar(255)                             not null,
    constraint payment_payer_id_fk
        foreign key (payer_id) references user (id),
    constraint payment_receiver_id_fk
        foreign key (receiver_id) references user (id)
);

create table promotion
(
    id           binary(16)  default (uuid_to_bin(uuid())) not null
        primary key,
    category_id  int                                       null,
    job_id       binary(16)                                not null,
    started_date datetime                                  not null,
    expiry_date  datetime                                  not null,
    status       varchar(25) default 'PENDING'             not null,
    payment_id   binary(16)                                null,
    constraint promotion_job_id_fk
        foreign key (job_id) references job (id)
            on update cascade on delete cascade,
    constraint promotion_payment_id_fk
        foreign key (payment_id) references payment (id),
    constraint promotion_promotion_category_id_fk
        foreign key (category_id) references promotion_category (id)
            on delete set null
);

create table rate
(
    id               binary(16) default (uuid_to_bin(uuid())) not null
        primary key,
    rater_id         binary(16)                               not null,
    rate_receiver_id binary(16)                               not null,
    rating           int                                      not null,
    comment          varchar(255)                             null,
    created_date     datetime   default (now())               not null,
    job_id           binary(16)                               not null,
    constraint rate_job_id_fk
        foreign key (job_id) references job (id),
    constraint rate_rater_id_fk
        foreign key (rater_id) references user (id),
    constraint rate_receiver_id_fk
        foreign key (rate_receiver_id) references user (id)
);


INSERT INTO job_category (category) VALUES
                                        ('Delivery & Logistics'),
                                        ('Food Service'),
                                        ('Retail'),
                                        ('Events & Promotion'),
                                        ('Tutoring & Education'),
                                        ('Cleaning & Maintenance'),
                                        ('Data Entry'),
                                        ('Tech Support'),
                                        ('Other');


INSERT INTO user (
    email,
    password,
    is_verified,
    trust_score,
    created_at,
    contact,
    updated_at,
    average_rate,
    total_ratings,
    is_employer,
    is_jobseeker,
    role
) VALUES (
             'admin@daybee.com',
             '$2a$12$xiJr3Pv0vsSf79USrIE9oeFHYdUyG7jIOr7DyZPFDuN/bSvMkNAkC',
             1,
             0,
             NOW(),
             '0771234567',
             NOW(),
             0.0,
             0,
             0,
             0,
             'ADMIN'
         );
