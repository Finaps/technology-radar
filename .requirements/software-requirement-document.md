## 1. Introduction

_Describe the purpose of the document._

### 1.1 Product scope

_List the benefits, objectives, and goals of the product._

### 1.2 Product value

_Describe how the audience will find value in the product._

### 1.3 Intended audience

_Write who the product is intended to serve._

### 1.4 Intended use

_Describe how will the intended audience use this product._

### 1.5 General description

_Give a summary of the functions the software would perform and the features to be included._

## 2. Functional Requirements

_List the design requirements, graphics requirements, operating system requirements, and constraints of the product._

## 3. External Interface Requirements

### 3.1 User interface requirements

For the radar view of the tool:
The interfaces must allow the users to get the full view of the radar in its current state, as well as allowing them to interact with each radar blip to get more in-detail information about it, and its changes through history. The full radar view serves mainly as a general overview of Finaps current technology landscape, allowing the users to observe the current state of the Tech radar as a whole. Each blip detail page gives the user much more context about each blip, and even more context is given with the blip history page, as well as including links to supporting pages such as the **request changes** page. Both the blip details and blip history page could work as modals or overlayed pages to the main radar page, keeping the radar visible to click and navigate through more radar blips.

For the back office for the tool: 
The tool should have interfaces that allow the users of the Finaps Panel of Tech to create, update, delete, and read information about the blips, as well as allowing them to accept/reject change requests from Finaps engineers.

### 3.2 Hardware interface requirements

The tool will be hosted remotely (specifics are yet to be determined) and will use HTTP communication protocol to move information to and form the back end to the end users.

### 3.3 Software interface requirements

The tool could be split into a radar view (displaying the information on the radar itself and on the individual blips), and a back-office (controlling the CRUD operations for the different individual blips, as well as change requests from Finaps engineers, either from Pull Requests, or from the back-office request system, depending on which one is finally selected).



### 3.4 Communication interface requirements

_List any requirements for the communication programs your product will use, like emails or embedded forms._

## 4. Non-functional Requirements

### 4.1 Security

_Include any privacy and data protection regulations that should be adhered to._

### 4.2 Capacity

_Describe the current and future storage needs of your software._

### 4.3 Compatibility

_List the minimum hardware requirements for your software._

### 4.4 Reliability

_Calculate what the critical failure time of your product would be under normal usage._

### 4.5 Scalability

_Calculate the highest workloads under which your software will still perform as expected._

### 4.6 Maintainability

_Describe how continuous integration should be used to deploy features and bug fixes quickly._

### 4.7 Usability

_Describe how easy it should be for end-users to use your software._

### 4.8 Other

_List any additional non-functional requirements._

## 5. Definitions and Acronyms

| Definition/Acronym | Description |
| ------------------ | ----------- |
| Word 1             | Word 2      |
|                    |             |
|                    |             |
