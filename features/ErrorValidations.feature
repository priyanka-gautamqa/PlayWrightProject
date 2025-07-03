Feature: Ecommerce Validations
    @Validations
    Scenario Outline: Invalid Login
        Given login to the application2 with "<username>" and "<password>"
        Then Verify error message is displayed

        Examples:
            | username                       | password       |
            | priyanka.gautam19051@gmail.com | wrongpassword1 |
            | priyanka.gautam19052@gmail.com | wrongpassword2 |