# Lab 8 - Starter
Jackie Kwok

1) I would put my automated tests within a GitHub action that runs whenever code gets pushed so that my team can quickly test new code. This way, we would also know if the new code is breaking something in the project if we notice that it fails a test that our old code passed before. 
2) I wouldn't use an end to end test to check if a function is returning the correct output because an end to end test emulates user actions from start to finish. A regular user wouldn't be able to check the output of a specific function, so it wouldn't make sense to use an end to end test. I would use a unit test to test the output of a function. 
3) I wouldn't use a unit test to test the messaging feature of an app. This is because the messaging feature could involve multiple functions and unit testing doesn't allow you to check how those function interact with each other. 
4) I would use a unit test to test the "max message length" feature of a messaging app because that sounds like it could be done in its own standalone function. I can do a unit test for this feature and it won't affect my other unit tests for my other functions. 
