Feature: Ecommerce Validations

    Scenario: Placing order and checkout
        Given login to the application with "priyanka.gautam1905@gmail.com" and "$$$$$$"
        When Add "ZARA COAT 3" to the cart
        Then Verify "ZARA COAT 3" is displayed in the Cart page
        When Enter valid details and Place the order
        Then Verify Order Present in OrderHistoryPage

