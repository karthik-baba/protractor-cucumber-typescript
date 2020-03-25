Feature: To verify the homepage of JetBlu

    @Regression @Homepage
    Scenario: Verify Logo
        Given I am on jetBlu home page
        When I see the jetblu url
        Then I should see welcome message

    @Regression @Search
    Scenario: Search Flights
        Given I am on jetBlu home page
        When I type "Sacramento, CA (SMF)" in the from field
        When I type "New York, NY (JFK)" in the to field
        When I type "03/25/2020" in the departure date
        When I type "03/31/2020" in the return date
        When I click on search button
        Then I should see Departing flights

    @Regression @TestData @Release1.1
    Scenario Outline: Search for Flights from <From_destination> to <To_Destination>
        Given I am on jetBlu home page
        When I type "<From_destination>" in the from field
        When I type "<To_Destination>" in the to field
        When I type "<Departure_Date>" in the departure date
        When I type "<Return_Date>" in the return date

        Examples:
            | From_destination     | To_Destination       | Departure_Date | Return_Date |
            | Sacramento, CA (SMF) | New York, NY (JFK)   | 03/25/2020     | 03/31/2020  |
            | New York, NY (JFK)   | Sacramento, CA (SMF) | 03/25/2020     | 03/31/2020  |