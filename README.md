**1.	Organization of Git Repository**

A git repository with the title of Chat App was created for this project. Regular commits were made to the repository after the completion of a feature for each component. New branches were made for adding features such as adding user to channel or group that were eventually merged after the branch was a success.
    1.	The src folder contains the node application.
    2.	The server folder contains the server information.
    3.	Readme.md contains the information on how to set the project locally.
    4.	All the packages and modules have been saved by using –save command to make it easier to set the project locally easily.
    
**2. Data Structures**

The following data structures have been used in the application

Client Side:
Interfaces have been used to define the structure of the information that is sent and received. They have also been used to make it easier for the app        to iterate the data received from the server.
The following interfaces have been used and their description has been provided below.
    1.	User
    2.	Users: [User]
    3.	Groups: [Group]
    4.	Group
    5.	Channels: [Channel]
    6.	Channel
    7.	Messages: [Message]
    8.	Message

Server Side:
The files have been stored in Json format. The data is passed from the client and is added, updated, or deleted accordingly.

Users: 	The users are stored and retrieved as an array of User from the json file.
Groups: The groups are stored and retrieved as an array of Group from the json file. The members are linked list of users.
Channels: This is an array of channel of a group with a linked list of users each channel. This also contains link to the messages of each channel.
Messages: This is an array of Messages. Each message is linked to a channel and a user.

**3.	Angular Architecture**

    a.	Components: 
      1.	Login Component: this component is used for authentication purposes. It displays the login page as well.
      2.	Group Component: This send displays the group page after successful authentication.
      3.	Channel Component: This displays the messages in a channel after selecting one.
      4.	User List Component: This displays the complete list of users.
      5.	Group Add Component: This displays the form to add user to a group that is not part of the group yet.
      6.	Channel Add Component: This displays the form to add user to a channel that is already part of a group.
      7.	App Header Component: This displays the navbar with logout button after logging in.
      8. 
    b.	Services: 
      1.	Auth Service: This service is used to authenticate the user based on the information passed from the Login Component.
    c.	Models (Interfaces):
        1.	User: This is used for posting a new user as well as getting user details from the server. In User list a get request is send with return as an   array of users.
        This is used for posting:	
          User		{
            username: Text,
            userpassword: Text
          }
          This is used for getting user details:
          User 		{
            userid: Number,
            username: Text,
            username: Text,
          userrole: Text,
          groups: [Number]
          }
        2.	Group: This is used to get as well as post a new group. An array of groups is received from the server in the home page. A post sent is sent with the User when creating a new one.
          Group		{
            groupid: Number,
            members: [Number],
            admin: [Number],
            assistant: [Number],
          channels: [Channel]
          }
        3.	Channel: This is used to get the channel details and is used inside of Group Interface as an array of Channels. This is also used get all the channel details as well as post details of new user.
          Channel 	{
            channelid: Number,
            members: [Number]
          }
        4.	Messages: This is used to get and post messages in a channel. An array of Message interface is used inside messages
          Message	{
          userid: Number,
          message: Text
          } 
          Messages 	{
            channelid: Number,
            messages: [Message]
          }
    d.	Routes:
      1.	Login: This route is the starting point of the application and is connected to Login Component. This route is also used for logging out.
      2.	Group: This is routes to the Group Component after authentication is successful.
      3.	Channel: This routes to the message list of the channel selected.
      4.	User List: This routes to the list of all users in the application.
      5.	Add User to group: This routes to the page to add user to group.
      6.	Add User to channel: This routes to the page to add user to a channel.
      
**4.	Node Server Architecture:**

    a.	Modules List:
      1.	Express
      2.	Cors
      3.	Body Parser
      4.	Http
      5.	Filesystem(fs)
    b.	Functions:
      1.	Readfile: This function is used to read data from the files.
      2.	WriteFileSync: This function is used to write to the files.
      3.	Parse: This is used to convert the data from json format.
      4.	Stringify: This is used to convert the data into json format
      5.	Listen: This function is used to start the listening server.
    c.	Files:
      1.	Data: 
        a.	users.json: This contains the list of all users with their user name and passwords.
        b.	extendedUsers.json: This contains the details of the users and the groups they are member of.
        c.	groups.json: The contains list of all groups and channels and their members.
        d.	channelMessages.json: This contains the list of all channels and their messages.
      2.	Routes & their Functions:
        a.	authenticate.js: 
          i.	Parameters: This takes the user id and passwords as parameters.
          ii.	Return Values: It returns the User information as well as the group information they are part of.
          iii.	purpose: The purpose of this route is to authenticate the user.
        b.	users.js:
          i.	Parameters: This takes no parameters.
          ii.	Return Values: This sends the user list as a json file.
          iii.	purpose: The purpose of this route is to get the list of all users.
        c.	addUser.js:
          i.	Parameters: This takes username, password, and email as parameters.
          ii.	Return Values: This returns nothing.
          iii.	purpose: The purpose of this route is to add new users.
        d.	deleteUser.js:
          i.	Parameters: This takes the username as a parameter.
          ii.	Return Values: This writes the changes made to the file.
          iii.	purpose: The purpose of this route is to delete existing users.
        e.	groups.js:
          i.	Parameters: This takes the user id as a parameter.
          ii.	Return Values: It returns the list of all groups and channels the user is part of.
          iii.	purpose: The purpose of this route is to display the details of the group and channels the current user is part of.
        f.	channel.js
          i.	Parameters: channel id is the parameter.
          ii.	Return Values: A list of all the messages in the channel is returned.
          iii.	purpose: The purpose of this route is to get all the messages of a current channel.
        g.	newMessage.js:
          i.	Parameters:
          ii.	Return Values: 
          iii.	purpose: The purpose of this route is to add a new message to the list of messages.
        h.	members.js:
          i.	Parameters: the message and channel id are taken up as a parameter.
          ii.	Return Values: It writes the changes to the file.
          iii.	purpose: The purpose of this route is to get the current members of a group or channel.
        i.	addmember.js:
          i.	Parameters: This tales the request type, group id, channel id and user id as parameters
          ii.	Return Values: This writes the changes to the file.
          iii.	purpose: The purpose of this route is to add a member to the group or channel.
          
**5.	Responsibilities between Client and Server**

    1.	GET: The clients send a get request on initialization of a component to a server. The server returns a json file.
      a.	A get request is sent for getting the user list.
      b.	A get request is sent for getting the group and channel information for the user that has been authenticated. 
      c.	A get request is sent to get all message in a channel.
      d.	A get request is sent to get all users in a group or channel.

    2.	POST: The clients send a post request to the server after any form data is submitted. The client posts the request in as json and the server sends an ok response after success. 
      a.	A post request is sent for authenticating the user.
      b.	A post request is sent for adding a new user.
      c.	A post request is sent to add a new message to a channel.
      d.	A post request is sent to add a user to the group or channel.

    3.	The client also sends a delete request to the user to delete the user from the user list.
      a.	 A delete request is to send to delete a user from the user list.
      
**6.	Interaction between Client components and Server**

    - Login Page Component: After the submission of the user information in the Login Page, the data will be checked and returned true if valid. The auth service will route the page to Group Component with a list of all groups and channels. The global variable ‘isLoggedIn’ will be set to true. The username and role will be stored in the local storage.

    - Group Add Component: The client will send a post request with a user id and group id and user role to the server. The server will update the extended user json file to add user in the groups list as well as the group json file to add user in the group. Depending upon the role selected it will add the role to the group file as well. The file will be overwritten with new data containing the latest changes. The Group Add component will refresh page with the new member included in the group member list.

    - Channel Add Component: The client will send a post request with a user id and channel id and message to the server. The server will update the group json file to add user in the members of the specified channel of the group. The new data containing the latest changes will overwrite the existing file. The Channel Add component will refresh page with the new member included in the channel member list.

    - Message Component: The client will send a post request containing the channel id, message, and the user id. The server will append the new message to the list of messages for a specific channel. The changes will be saved in the json file. The page will refresh to get the new list of messages. The new message will be displayed in the current component. 

    - User Component: The client will send a post request containing the information of the new user. The server will update both the user and extended user json file with the user information. The User Component will reload with the new user in the list.

**7. Server Architecture**
  Route Files: 
  1.	api-getuserlist.js: 
    a.	Length: 10
    b.	Usage: Used to get the list of all users.
    c.	Variables: None
    d.	Returns: data: List of all the users.
  2.	api-getgroups.js: 
    a.	Length: 9
    b.	Usage: Used to get the list of all groups.
    c.	Variables: None
    d.	Returns: list of all the groups.
  3.	api-getmessages.js:
    a.	Length: 19
    b.	Usage: Used to get all messages in a channel.
    c.	Variables: 
    i.	channelid: the id of channel requested.
    d.	Returns: returns the chat history
  4.	api-getgroupmembers.js:
    a.	Length: 27
    b.	Usage: Used to get information of all group and channel members.
    c.	Variables: 
    i.	group: Group details.
    ii.	groupMembers: All group members.
    iii.	members: Member data of the group.
    iv.	nonmembers: Non-member data of the group.
    d.	Returns: Group, channel, and member information.
  5.	api-loadchannelmembers.js:
    a.	Length: 41
    b.	Usage: Used to get list of all members in a channel of a group.
    c.	Variables: 
    i.	groupid: Group id.
    ii.	channelid: Channel id.
    iii.	channeldata: Channel data.
    iv.	groupMembers: Group members.
    v.	channelmembers: Channel members.
    vi.	nonmembers: non-members of channel
    d.	Returns: Channel data, members, and non-members.
  6.	api-login.js: 
    a.	Length: 11
    b.	Usage: This is used to authenticate user.
    c.	Variables: 
    i.	user: user login credentials (username and password).
    d.	Returns:
    i.	data: It returns all the user information.
  7.	api-adduser.js:
    a.	Length: 38
    b.	Usage: Used to add new user to user list.
    c.	Variables: 
    i.	User: user data submitted in form.
    ii.	Image: user image.
    d.	Returns:
    i.	Message: if user has been added successfully.
    ii.	Error: if there is an error in adding user.
  8.	api-addgroup.js:
    a.	Length: 29
    b.	Usage: Used to insert new group.
    c.	Variables: 
    i.	group: group data in request.
    ii.	newgroup: filtered group data that will be inserted into groups collection.
    d.	Returns: Inserts the new group into the collection.
  9.	api-addmessage.js:
    a.	Length: 20
    b.	Usage: Used to add the text message into the collection
    c.	Variables: 
    i.	channelid: ID of channel.
    ii.	userid: ID of user.
    iii.	username: Name of the user
    iv.	message: Message.
    v.	userimage: Image of user.
    d.	Returns: Add the new message into the collection
  10.	api-adduserchannel.js:
    a.	Length: 27
    b.	Usage: used to add user to the channel
    c.	Variables: 
    i.	channelid: ID of channel.
    ii.	userid: ID of user.
    iii.	channelata: data of the channel
    iv.	newchanneldata: channel data with user inserted.
    d.	Returns: Adds the user into the channel.
  11.	api-addusergroup.js:
    a.	Length: 14
    b.	Usage: Used to add user to group
    c.	Variables: 
    i.	groupid: ID of group.
    ii.	userid: ID of user.
    d.	Returns: Adds user to the group.
  12.	api-deletechannel.js:
    a.	Length: 21
    b.	Usage: used to delete the channel.
    c.	Variables: 
    i.	channelid: ID of channel.
    ii.	groupid: ID of group.
    d.	Returns: removes the channel from stored data both in group and channel.
  13.	api-deletegroup.js:
    a.	Length: 18
    b.	Usage: Used to delete the group
    c.	Variables: 
    i.	id: ID of group.
    d.	Returns: Deletes the channel from data.
  14.	api-deleteuser.js:
    a.	Length: 18
    b.	Usage: Used to delete the user.
    c.	Variables: 
    i.	id: id of user
    d.	Returns: Deletes the user from database.
  15.	api-deleteuserchannel.js:
    a.	Length: 30
    b.	Usage: Used to delete user from channel
    c.	Variables: 
    i.	userid: ID of user.
    ii.	channelid: ID of channel.
    iii.	channelData: Channel data.
    iv.	newchanneldata: Channel data after deleting user.
    d.	Returns: Deletes the user from channel.
  16.	api-deleteusergroup.js:
    a.	Length: 14
    b.	Usage: Used to delete user from group
    c.	Variables: 
    i.	userid: ID of user.
    ii.	groupid: ID of group.
    d.	Returns: Deletes user from group.
  17.	api-newchannel.js:
    a.	Length: 20
    b.	Usage: Used to add new channel to a group
    c.	Variables: 
    i.	groupid: ID of group.
    d.	Returns: Adds a new channel to the group.
  18.	api-updateuser.js:
    a.	Length: 15
    b.	Usage: Used to update user role to super.
    c.	Variables: 
    i.	id: ID of user.
    d.	Returns: Updates the role of specified user.
  19.	api-uploadImage.js:
    a.	Length: 29
    b.	Usage: used to upload new message to chat when image is uploaded as well.
    c.	Variables:
    i.	Message: The message to be uploaded
    d.	Returns: Add the new message to the messages.
  20.	api-groupAssistant.js:
    a.	Length: 18
    b.	Usage: used to upgrade user role to group assistant.
    c.	Variables: 
    i.	userid: ID of user.
    ii.	groupid: ID of group.
    d.	Returns: Upgrades user to group Assistant.
  21.	api-groupAdmin.js:
    a.	Length: 18
    b.	Usage: used to upgrade user role to group admin.
    c.	Variables: 
    i.	userid: ID of user.
    ii.	groupid: ID of group.
    d.	Returns: Upgrades user to group Admin.

  Socket File:
    Socket.js: This is used to add live chat messaging to the application.
  Module List:
    1.	Express: Access requests.
    2.	cors: Accept request from another domain.
    3.	body-parser: encoding data.
    4.	http: Handling requests.
    5.	socket.io: real time chat.
    6.	multer: uploading imaging.
