# Mortgage Calculator slack app

Mortgage Calculator slack app, generated with the [botkit](https://botkit.ai/) starter. 

Calculates monthly mortgage payments controlled by slack

# Configuration:

## Required environmental Variables

These variables correspond to the variables on the basic information page of the slack app 

    CLIENT_SIGNING_SECRET=
    CLIENT_ID=
    CLIENT_SECRET=

## Hosting

The service needs to be running somewhere where slack can reach it. For example, AWS EC2

# Usage

Start the server with:
    
    npm start

This will inicate the port on which it's running.

# Expected Behaviour

In Slack, any message containing 'Mortgage' will trigger this app.
Required inputs; three numbers [price], [mortgage interest], [term]

Example:
    
    mortgage 500000, 0.03, 30

will return a block containing: 

     Your montly payment based on
     price: 500000
     interest: 0.03
     term: 30 years
     is <b>2125.80</b> per month

