CREATE PROCEDURE Sp_Update_User
    @Id INT,
    @Name VARCHAR(100),
    @Email VARCHAR(100),
    @PhoneNo BIGINT,
    @Address VARCHAR(255),
    @State VARCHAR(50),
    @City VARCHAR(50),
    @Agree BIT
AS 
BEGIN
    UPDATE UserForm
    SET Name = @Name,
        Email = @Email,
        PhoneNo = @PhoneNo,
        Address = @Address,
        State = @State,
        City = @City,
        Agree = @Agree
    WHERE Id = @Id;
END