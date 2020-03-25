Feature: Testing Release Specific tags

    @Release1
    Scenario: Verify Logo
        Given I am on jetBlu home page
        When I see the jetblu url
        Then I should see welcome message
