CREATE PROCEDURE Sp_Insert_User
    @Name VARCHAR(100),
    @Email VARCHAR(100),
    @PhoneNo BIGINT,
    @Address VARCHAR(255),
    @State VARCHAR(50),
    @City VARCHAR(50),
    @Agree BIT
AS 
BEGIN
    INSERT INTO UserForm (Name, Email, PhoneNo, Address, State, City, Agree) 
    VALUES (@Name, @Email, @PhoneNo, @Address, @State, @City, @Agree);
END