
create table Language
(
    id       int auto_increment
        primary key,
    language varchar(255) not null
);

create table Job_Category
(
    id       int auto_increment
        primary key,
    category varchar(255) not null
);


create table User
(
    id              bigint auto_increment primary key,
    name            varchar(255)                not null,
    email           varchar(255)                not null,
    password        varchar(255)                not null,
    role            varchar(255) default 'USER' not null,
    address         varchar(255)                not null,
    profile_picture varchar(255)                not null,
    nic             varchar(255)                not null,
    is_verified     boolean                     not null,
    trust_score     int          default 0      not null,
    skills          varchar(255)                null,
    created_at      datetime                    not null,
    contact         varchar(255)                not null,
    language_id     int                          null,
    constraint User_Language_id_fk
        foreign key (language_id) references Language (id)
            on update cascade on delete set null
);

create table Job
(
    id            bigint auto_increment
        primary key,
    title         varchar(255)   not null,
    employee_id   bigint         not null,
    description   longtext       not null,
    category_id   int          null,
    location      varchar(255)   not null,
    job_type      varchar(255)   not null,
    deadline      datetime       not null,
    posted_date   date           not null,
    status        varchar(255)   not null,
    salary        decimal(10, 2) not null,
    working_hours int            not null,
    skills        varchar(255)   not null,
    constraint Job_Job_Category_id_fk
        foreign key (category_id) references Job_Category (id)
            on update cascade on delete set null,
    constraint Job_User_id_fk
        foreign key (employee_id) references User (id)
            on update cascade on delete cascade
);

create table Promotion
(
    id                 bigint auto_increment
        primary key,
    promotion_category varchar(255) default 'BASIC' not null,
    job_id             bigint                       not null,
    started_date       datetime                     not null,
    expiry_date        datetime                     not null,
    constraint Promotion_Job_id_fk
        foreign key (job_id) references Job (id)
            on update cascade on delete cascade
);

create table Attendance
(
    id             bigint auto_increment
        primary key,
    user_id        bigint       not null,
    job_id         bigint        null,
    check_in_time  datetime     not null,
    check_out_time datetime     not null,
    qr_code        varchar(255) not null,
    constraint Attendance_Job_id_fk
        foreign key (job_id) references Job (id)
            on update cascade on delete set null ,
    constraint Attendance_User_id_fk
        foreign key (user_id) references User (id)
            on update cascade on delete cascade
);

create table Job_application
(
    id           bigint auto_increment
        primary key,
    job_id       bigint   not null,
    jobseeker_id bigint   not null,
    applied_date datetime not null,
    status       varchar(255) not null,
    constraint Job_application_Job_id_fk
        foreign key (job_id) references Job (id)
            on update cascade on delete cascade,
    constraint Job_application_User_id_fk
        foreign key (jobseeker_id) references User (id)
            on update cascade on delete cascade
);

create table Complaint_type
(
    id   int auto_increment
        primary key,
    type varchar(255) not null
);

create table Complaint
(
    id          bigint auto_increment
        primary key,
    reporter_id bigint        null,
    target_id   bigint       not null,
    description varchar(255) not null,
    created_at  datetime     not null,
    type_id     int           null,
    status      varchar(255) not null,
    constraint Complaint_Complaint_type_id_fk
        foreign key (type_id) references Complaint_type (id)
            on update cascade on delete set null,
    constraint Complaint_User_id_fk
        foreign key (reporter_id) references User (id)
            on update cascade on delete set null,
    constraint Complaint_User_id_fk_2
        foreign key (target_id) references User (id)
            on update cascade on delete cascade
);

create table Message
(
    id          bigint auto_increment
        primary key,
    description varchar(255) not null
);

create table Notification
(
    id         bigint auto_increment
        primary key,
    user_id    bigint   not null,
    message_id bigint    null,
    created_at datetime not null,
    constraint Notification_Message_id_fk
        foreign key (message_id) references Message (id)
            on update cascade on delete set null,
    constraint Notification_User_id_fk
        foreign key (user_id) references User (id)
            on update cascade on delete cascade
);

create table Rate
(
    id           bigint auto_increment
        primary key,
    rater_id     bigint        null,
    user_id      bigint       not null,
    rating       int          not null,
    comment      varchar(255) null,
    created_date datetime     not null,
    constraint Rate_User_id_fk
        foreign key (user_id) references User (id)
            on update cascade on delete cascade,
    constraint Rate_User_id_fk_2
        foreign key (rater_id) references User (id)
            on update cascade on delete set null
);

create table Payment
(
    id           bigint auto_increment
        primary key,
    payer_id     bigint         not null,
    receiver_id  bigint         not null,
    payment_date datetime       not null,
    amount       decimal(10, 2) not null,
    status       varchar(255)   not null,
    constraint Payment_User_id_fk
        foreign key (payer_id) references User (id)
            on update cascade,
    constraint Payment_User_id_fk_2
        foreign key (receiver_id) references User (id)
            on update cascade
);





