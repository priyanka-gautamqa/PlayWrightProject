Feature: Ecommerce Validations

    Scenario: Invalid Login
        Given login to the application2 with "priyanka.gautam1905@gmail.com" and "Learning"
        Then Verify error message is displayed

