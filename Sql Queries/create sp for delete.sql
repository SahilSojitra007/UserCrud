CREATE PROCEDURE Sp_Delete_User
    @Id INT
AS 
BEGIN
    DELETE FROM UserForm
    WHERE Id = @Id;
END
