
CREATE DATABASE `sql_NodejsShop`;
USE sql_NodejsShop;

CREATE TABLE `rols`(
    `id` INT NOT NULL auto_increment,
    `rol` VARCHAR(50) NOT NULL,
    `createdAt` TIMESTAMP(5),
    `updatedAt` TIMESTAMP(5),   
    UNIQUE INDEX `rol_uniquex` (`rol` ASC) VISIBLE,
    PRIMARY KEY(`id`)
);

CREATE TABLE `users`(
    `id` INT NOT NULL auto_increment,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(300) NOT NULL,
    `rolId` INT,
    `google` BOOLEAN DEFAULT false,
    `img` VARCHAR(500),
    `status` BOOLEAN DEFAULT true,
    `createdAt` TIMESTAMP(5),
    `updatedAt` TIMESTAMP(5),    
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
	UNIQUE INDEX `password_UNIQUE` (`password` ASC) VISIBLE,
    CONSTRAINT `rolId` FOREIGN KEY (`rolId`) REFERENCES `rols`(`id`),
    PRIMARY KEY(`id`));
    
CREATE TABLE `categories`(
	`id` INT NOT NULL auto_increment,
	`category` VARCHAR(50),
	`userId` INT,
    `status` TINYINT DEFAULT 1,
    `createdAt` TIMESTAMP(5),
    `updatedAt` TIMESTAMP(5),
	CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users`(`id`),
    PRIMARY KEY(`categoryID`)
);

CREATE TABLE `products`(
	`id` INT NOT NULL auto_increment,
	`product` VARCHAR(50),
    `unitPrice` FLOAT,
    `description` VARCHAR(300),
    `available` TINYINT(1) DEFAULT 1,
	`UserId` INT,
    `categoryId` INT,
    `createdAt` TIMESTAMP(5),
    `updatedAt` TIMESTAMP(5), 
	CONSTRAINT `UserId` FOREIGN KEY (`UserId`) REFERENCES `users`(`id`),
    CONSTRAINT `categoryId` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`),
    PRIMARY KEY(`id`)
);

show tables;

