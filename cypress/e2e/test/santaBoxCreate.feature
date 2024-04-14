Feature: User logins and creates a box on Santa Secret website

    Scenario: User logins and creates a box
        Given User is on Secret Santa login page
        When User logins
        Then User is on dashboard page
        When User fills out the box details
        Then User is able to interact with participants

    Scenario: User adds participants
        Given User is on the invite page
        When User clicks the "Добавить участников" button
        Then User should get an invite link

    Scenario: User1 approves invitation
        Given User1 received an invite link
        When User1 visits the invite link
        When User1 logins
        Then User1 should be able to create members card

    Scenario: User2 approves invitation
        Given User2 received an invite link
        When User2 visits the invite link
        When User2 logins
        Then User2 should be able to create members card
        
    Scenario: User3 approves invitation
        Given User3 received an invite link
        When User3 visits the invite link
        When User3 logins
        Then User3 should be able to create members card

    Scenario: User deletes the box
        Given User logins an deletes the box with API
        