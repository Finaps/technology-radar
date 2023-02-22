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

_Describe the logic behind the interactions between the users and the software (screen layouts, style guides, etc)._

The tool uses the following interfaces for the radar:
1. **The full radar view**, where users can interact with each individual blip by hovering them, revealing the specific technology the blis is referencing. Each individual radar blip, serves also as a link to a **blip page**. The radar is in full display with the appropriate legend to clear up any iconography used on this interface.
2. **Blip details page**, where more detail about the blip is shown, such as the reason as to why it has been moved to where it is, or a biref description of the technology/techinqe. Each blip details page has a reference to it's **history page**. 
3. **Blip history page**, where a "map" of all changes through time the specific blip, as well as a small description for each change and the date it happened.

The tool uses the following interfaces for the "back office" section: 
1. **Login page** to authenticate Software Engineer Panel of Thech members to the "back office" section of the radar.
2. **See all blips page** A page where all blips are listed, each with relevant information about them and action buttons that lead to the **edit blip** page and the delete action.
3. **Add blip page**, where there is a form that the users (Software Engineering Panel of Tech) fill to add a new blip to the radar.
4. **Edit blip page**, where there is a form with the current information about the blip and the possibility to change each field in order tu update its values in the database.
5. **Delete blip modal**, where a model pops up requiering user verification to delete a specific blip.



The full radar view serves mainly as a general overview of Finaps current technology landscape, allowing the users to observe the current state of the Tech radar as a whole. Each blip detail page gives the user much more context about each blip, and even more context is given with the blip history page.

Both the blip details and blip history page work as modals to the main radar page, keeping it vissible to click and navegate through more radar blips.

### 3.2 Hardware interface requirements

_List the supported devices the software is intended to run on, the network requirements, and the communication protocols to be used._

### 3.3 Software interface requirements

_Include the connections between your product and other software components, including frontend/backend framework, libraries, etc._

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
