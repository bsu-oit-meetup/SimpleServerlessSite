Boise AWS Meetup

Tuesday, September 10, 2019

### Agenda

Meet and Greet

Introduction by Max Davis-Johnson 

Demo by Boise State University web developers Shaunna Kennedy and Matt Smith

Questions and Discussion 

### Simple Serverless Site in Seconds Walkthrough

  

This walkthrough will show how to manually set up and host a simple serverless website in AWS, as well as how to automate the configurations to be completed in seconds. The site will be very simple but the services used in this demo can be used to create sophisticated applications that scale.

#### Getting Started in AWS

1. Log into the AWS console at [https://aws.amazon.com/console](https://aws.amazon.com/console) 
    1. Creating an account is free 
    2. Creating an account can take up to an hour 
    3. Be aware of your region.  For this demo we are using us-west-2 (Oregon). 

2. Download the demo files at: /* TDB */ 

#### Lambda - Serverless Compute : Webapp “Server-side” 

The website’s backend will be serverless function that will send an email through Amazon Web Services’ Simple Email Service (SES). 

1. On the AWS Console, search for and select “Lambda” 
2. Click the Create Function button 

    1. Choose the “Author from Scratch” option  
    2. Enter the function name “SSSDemo” 
    3. Select “Node.js 10.x” as the runtime 
    4. Under permissions select “Create a new role with basic Lambda Permissions” 
    5. Click “Create Function” 

1. Scroll down to the “Function Code” Section 
    1. In the “Code entry type” dropdown select “Edit code inline” 
    2. Double click the index.js file on the left side of the editor 
    3. From the starter files, copy the contents of “index.js” into the editor 

2. Below the code in the “Environment variables” section add the following variables 
    1. “EmailFromAddress” to whatever email you want 
    2. “EmailToAddress” to whatever email you want 
    3. “Region” to us-west-2 

3. Keep all other default settings, press “Save” 
  
  

1. To test the newly created Lambda function click “Test” in the top right 
    1. Select the radio button “Create Test Event” 
    2. Enter any name for the “Event Name” 
    3. Enter the following JSON object as the test request message: { 

    "suggestion":"This is a test suggestion"

}

    1. Click “Create”  
    2. Click “Test” again in the top right with the event selected  

1. At the top of the Lambda screen click “Details” under “Execution result” 
    1. The test run will show that an error occurred 
    2. The error message details that the Role does not have sufficient permission to SES and/or the emails are not verified.  This will be addressed in the next section. 

#### SES - Simple Email Service

Newly created AWS accounts are in “Sandbox” mode which requires BOTH the sending email address and recipient email address to be verified.

1. On the AWS Console, search for and select “Simple Email Service” 
2. Click “Email Addresses” on the left of the screen 
3. Click the “Verify a New Email Address” button in the top left 
    1. Verify the email addresses that were provided in the Lambda’s environment variables 
    2. An email will be sent to the emails being verified 
    3. Click the link in the email to verify the address 

4. Make note of the “ARN” for your verified email address 

#### IAM - Identity and Access Management : Resource Permissions

AWS Permissions are granular and should be configured with narrow scope. 

1. On the AWS Console, search for and select “IAM” 
2. Click on “Roles” on the left of the screen 
3. Edit the role beginning with “SSSDemo” (associated with your newly created Lambda) 
4. Click “Add inline policy” 
    1. Select the “JSON” tab 
    2. Copy/Paste the contents of the SES-RestrictFeaturesAndSender.txt file from the demo files 
    3. Update the “Resource” to be the ARN of your verified email address. 
    4. Click “Review Policy” 
    5. Provide a name 
    6. Click “Create Policy” 

5. After the policy update in the previous section and the email address verification, testing your Lambda function should work. 

#### API Gateway : Make Public/Secured APIs

1. On the AWS Console, search for and select “API Gateway” 
2. Click “Create API” in the top left or “Get Started” 
    1. Change the “Create new API” radio button to “New API” 
    2. Use “SSSDemo” for the API Name 
    3. Click “Create” 

3. Click the “Actions” dropdown and click “Create Resource” 
    1. Enter “email” for the Resource Name 
    2. Check the “Enable API Gateway CORS” checkbox 
    3. Click “Create Resource” 

4. Click the “Actions” dropdown and click “Create Method” 
    1. Select POST in the dropdown beneath “/email” and click the checkmark 
    2. Select “Lambda Function” for the integration type  
    3. In the “Lambda Function” field start typing “SSS” and it should autocomplete “SSSDemo” the Lambda function that was created earlier 
    4. Click “Save” and a warning will appear saying that new permissions will be granted to the “SSSDemo” which will give API Gateway permission to the Lambda 
    5. Click “OK” 

5. Enable CORS 
    1. In the “Actions” dropdown click “Enable CORS” 
    2. Click the “Enable CORS and replace…” button 
    3. Click “Yes, replace existing values” 

6. In the “Actions” dropdown click “Deploy API” 
    1. Select “New stage” in the dropdown 
    2. Enter “dev” 
    3. Click “Deploy” 

7. Deploying the API should display the “Stages” screen 
    1. Make note of the “Invoke URL” 
    2. This URL is where the suggestions will be POSTed to by the client HTML 

#### S3 - Simple Storage Service : Webapp “Client Side”

S3 buckets can be used to store nearly anything. We will be storing our pre-built Angular application for the client side in an S3 bucket.

1. On the AWS Console, search for and select “S3” 
2. Click “Create Bucket” 
    1. Bucket names have to be unique across AWS 
    2. Provide the name “sss-demo-” followed by something to make it unique then Click “Next” 
    3. Keep the defaults and click “Next” again 
    4. On the “Set Permissions” tab, uncheck “Block all public access”, click “Next” 
    5. Click “Create bucket” 

3. Click on the newly created bucket 
    1. Click “Properties” 
    2. Then click “Static website hosting” 
    3. Select “Use this bucket to host a website” 
    4. Enter “index.html” in to the “Index Document” field 
    5. Make note of the “Endpoint” url 
    6. Click “Save” 

4. Click on “Bucket Policy” under the “Permissions tab 
    1. Copy the provided bucket policy from S3-PolicyForWebHosting.txt in the demo files. 
    2. Edit the bucket policy and replace “example-bucket” with the name of your bucket 
    3. Click “Save” 

5. Click the “Overview” tab for the bucket to upload the client HTML files 
    1. Click Upload 
    2. From the demo files, upload the contents of the “client-side-distributable” folder 

#### Finished!

1. Open the Static Website Hosting “Endpoint” url in a new window 
2. Enter a suggestion 
3. Enter the API Gateway URL into the corresponding field.  Remember to add the resource path “/email” 
4. Submit and check the emails used in the SSSDemo Lambda 

#### EXTRA! Route53, CloudWatch, CloudFront, CloudFormation

- CloudFront is required… 
    - In order to utilize SSL/https 
    - For full caching options 
    - For Angular and other SPAs, when utilizing routing, CloudFront  

  

- Cloudwatch for detailed Lambda/API Gateway logs 
- Route53 is for custom domain names 
  

#### CloudFormation

1. Search and select “CloudFormation” on the AWS console 
    1. Create a stack 
    2. Name the stack “SSSSCFDemo” 
    3. Provide the variables 
        1. APIGatewayNameParam - “SSSS-CFDemo-API” 
        2. EmailFromAddress 
        3. EmailToAddress 
        4. LambdaFunctionName - “SSSS-CFDemo-SendEmailFunction” 
        5. LambdaRoleName - “SSSS-CFDemo-SESLambdaRole” 
        6. BucketNameParam - “ssss-cf-demo-site-bucket-123” (edit to be more unique) 

    4. Click “Next” until the confirmation page 
    5. Check the “I acknowledge”  
    6. Click “Create Stack” 
    7. On the new page under the “Events” tab 
        1. View the progress of the creation of all the resources 
        2. See logs for errors 

    8. Completed in seconds instead of all of the clicking 
    9. The created bucket is empty 

2. Navigate to API Gateway and note the Invoke URL for the new API Gateway created by Cloudformation 
3. Navigate to S3  
    1. Upload the site files to the newly created bucket 
    2. Go to Properties -&gt; Static Website Hosting and note url 

4. Try it out! 
  
  

Links of Interest

  

[https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteAccessPermissionsReqd.html](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteAccessPermissionsReqd.html)

  

[https://docs.aws.amazon.com/ses/latest/DeveloperGuide/sending-authorization-policy-examples.html](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/sending-authorization-policy-examples.html)

  

[https://aws.amazon.com/lambda/pricing/](https://aws.amazon.com/lambda/pricing/)

  

[https://aws.amazon.com/blogs/compute/developing-net-core-aws-lambda-functions/](https://aws.amazon.com/blogs/compute/developing-net-core-aws-lambda-functions/)

  

[https://docs.aws.amazon.com/cloudformation/index.html](https://docs.aws.amazon.com/cloudformation/index.html)

  

[https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/)