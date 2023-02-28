## 1. Introduction

This document describes in detail the concept, purpose, requirements and general information of the Finaps Technology Radar.

### 1.1 Product scope

Goal:
- To track and document tha status of relevant technologies/techniques used in software development in relation with Finaps' current technology landscape.

Benefits:
- Provides a platform to communicate lessons learned, good practices and experiences.
- Reflects decisions made about Finaps' technology landscape.
- Provides a better insight of different interesting and current technologies in the context of Finaps.

Objectives:
- To display Finaps' current technology context and its evolution through time.
- To serve as a guide to Finaps engineers when selecting technologies for new projects.
- To serve as a document on which to make technology-based decisions and investments.
- To serve as a tool for the marketing team to show externally what Finaps can do


### 1.2 Product value

For Finaps engineers:
- Provides aid when selecting a technology for a project based on previous experience and the opinions of the Finaps Panel of Tech.
- Provides a platform where knowledge about specific technologies can be shared.

For Finaps management:
- Provides a document where strategical decisions regarding technology are presented.
- Gives a visual panorama view of the current state of interesting and current technologies in comparison to Finaps' use and experience with them.
- Provides help and grounds to make business decisions related to technology used.

For Finaps marketing team:
- Provides a tool to show externally what Finaps can do
- Provides material for potential marketing content


### 1.3 Intended audience

Finaps management, Finaps Panel of Tech members, Finaps marketing team, and all Finaps engineers.

### 1.4 Intended use

This product is intended to work as the updated output of the Finaps Panel of Tech meetings and to be used as a tool and reference by all Finaps engineers. It is also intended to aid the strategical and tactical decision-making by Finaps management.

### 1.5 General description

The Technology Radar is a tool that graphically shows the input made by the Finaps Panel of Tech in regards of Finaps' technology landscape. It will place individual radar blips into four different quadrants (languages & frameworks, infrastructure, datastores, and data management) and four different levels of adoption (Adopt, Trial, Assess and Hold). Each radar blip will contain additional information about itself, and can contain references to external literature and documentation, as well as its evolution through the radar. A single blip will be a part of a single quadrant and have a single level of adoption determined by the Finaps Panel of Tech.

Levels of adoption:
- **Adopt**: Blips that are proven to work and trusted by the team to serve our purpose. Technologies and techniques that are suggested to seriously consider. Mature for use.
- **Trial**: Blips that have worked in the past and are known to work well for us but are not entirely proven. Not quite ready to be adopted but we have knowledge and experience with them that can be shared.
- **Asses**: Blips that are showing potential and we think are worth looking into. 
- **Hold**: Blips that are found not to be worth investing our time and effort. Technologies that are not recommended to work with even though they might be accepted at an industry level.

Radar quadrants (subject to change):
- **Languages & frameworks**: Programming languages and frameworks that can be used to develop a software development project, such as C#, TypeScript or Next.js.
- **Infrastructure**: Technologies  and/or techniques that provide infrastructure to a software development project, such as Docker or Kubernetes. 
- **Datastores**: Technologies  and/or techniques used to store data, such as Database Management Systems, Data Warehouses, remote file storage like PostgreSQL or Oracle DB. 
- **Data management**: Technologies and/or techinques used to manipulate and manage data, such as Apache Kafka or AWS Data Pipeline.

## 2. Functional Requirements

Design requirements:
- The tool must allow Fianps engineers to nevegate to the radar page and read its contents (hosting environment and location of the tool is still to be determined).
- The tool must show all blips in the radar.
- The tool must show particular information of each individual blip when interacted with it.
- The tool must show a blip's changes through the radar over time.
- The tool must save a blip's progress through time and its changes.
- The tool must allow Finaps engieneers to request changes to the radar (such as adding a new blip, or providing insight for the modification of the position of a current blip on the radar), giving the blip to change, the changes, and a reason for them.
- The tool must allow a user to login to the "back office".
- The tool must allow adding new blips the radar (Back office).
- The tool must allow editing blips from the radar (Back office).
- The tool must allow removing blips from the radar (Back office).
- The tool must allow updating a blip's position on the radar (level of adoption and/or quadrant) (Back office).
- The tool must allow members of the Finaps Panel of Tech to review the change requests sent by engineers.
- The tool must allow members of the Finaps Panel of Tech to reject or accept request change requests to the radar.
- The tool could allow Finaps marketing team to extract a "snapshot" of any current state of the radar to include in marketing campaings.

Graphic requirements:
- The tool must show clearly the position of each blip on the radar
- The tool must show clearly the boundaries between each quadrant and each level of adoption
- The tool must be color coded to easily recognize blips that are and are not grouped in the same categories
- The tool could show how close or far a blip is to its neighboring levels of adoption. *E.G. If a blip is closer to the "Asses" level of adoption than other blip, it actually means that the technology is closer to being in the "Asses" level than the other blip.*

Product constraints:
- The tool should not be taken as an in-depth guide of the technologies presented, but as a reference point to make decisions.
- The tool should not be taken as a market analysis
- The back office functionality of the tool must only be accesible by members of the Finaps Panel of Tech

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

### 4.1 Functional suitability

The Tech Radar should be able to provide and offer all functions that meet the stated objectives and goals. These functions must cover all specified tasks and objectives a user of the radar has (Functional completeness). All the functions must throw the expeced results (Functional correctness), and the functions must be able to accoplish the specified tasks and objectives (Functional appropriateness). All this should be accomplished by undesrtanding all potential user's needs and requirements. 

### 4.2 Reliability

The Tech Radar should be avaliable 99% of the time with a 1% of down time tolerance. (Subject to change)

### 4.3 Operability

For users to have access to the tool, they must have a computer/tablet/smarthphone with internet connection and navigate to the Tech Radar on a compatible web brower (See section 4.6).

 The user interface should be visualy pleasing and intuitive enough for any user to perform the desired task without confusion. 

### 4.4 Performance efficiency 

Any system function should take less than one second to perform its task, so it feels as responsive and fast as possible for users. The tool sohuld have a limited amount of resources (blips) to be on the radar at any given version, to not clutter the view and understanding of the radar and to not impact performance in a negative way. (Subject to change)

Since the tool is not expected to recieve a lot of trafic most of the time, the tool should perform seamlessly with as much as 20 simultanious connections. (Subject to change)

### 4.5 Security

- The Tech Radar should not use any sensible information about Finaps internal opperations.
- To access the back-office funcionality users need to be authenticated as members of the Finaps Panel of Tech, and must be authorized to use the back-office platform.
- Data transactions and operations must guarantee data integrity.

### 4.6 Compatibility

The Tech Radar should be operational and usable in any of the following environments:
- Any Chromium-based web browser (Google Chrome, Microsoft Edge, Brave, etc.)
- Safari web browser
- Mobile versions of Chromium-based web browsers
- Safari mobile version

### 4.7 Maintainability

- The Tech Radar's content will be mantained by the Finaps Panel of Tech, giving updates to it according to the periodical meetings had by the team. s
- All Finaps engineers will aslso be responsable of mantaining the radar by actively participating via the Change Requests feature at any time they consider necessary.


### 4.8 Transferability

The Tech Radar should be able to adapted in the future for future hardware and software changes and/or environments, as well as it should be simple and easy to install/unininstall on new enviromnents.

## 5. Definitions and Acronyms

| Definition/Acronym | Description |
| ------------------ | ----------- |
| Radar blip         | Any technology/technique that is used during software development |
|                    |             |
|                    |             |
