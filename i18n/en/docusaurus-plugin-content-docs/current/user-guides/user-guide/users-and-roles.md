---
sidebar_position: 5
---

# Users and Roles
## Users

Beaver IoT supports to add and manage sub-accounts by super admin account.

### Add User

1. Go to **Users and Roles > Users** page, click **Add** to add a new user.
2. Fill in the username, email and password of this user.

3. Click **Confirm** to save the settings.

   ![Add-user](/img/add-user.png)

### Edit User

1. Click **Edit** icon of desired user to modify the username and email address.

![Edit-user](/img/edit-user.png)

2. Click **Reset Password** icon of desired user to reset the password.

![Reset-password](/img/reset-user-password.png)

### Delete User

**Delete one user:** Click **Delete** icon of desired user to delete this user.

![Delete-single-user](/img/delete-single-user.png)

**Delete users in bulk:** check the boxes of desired users, click **Delete** button on the top to delete these users.

![Delete-user](/img/delete-user.png)



## Roles

Beaver IoT supports to create roles to assign the different resource permissions to different sub-accounts.

### Add Role

1. Go to **Users and Roles > Roles** page, click **Add** to create a new role.
2. Customize a role name, click **Confirm** to save the setting.

![Add-role](/img/add-role.png)

### Rename or Delete Role

Select the desired role in the left role list, click below icon to select **Rename** to modify the role name, or select **Delete** to delete this role.

![Edit-role](/img/edit-role.png)

### Add Members to Role

1. Select the desired role in the left role list, go to **Members** page and click **Add** to add users.

![Add-role-member](/img/add-role-member.png)

2. Check the boxes of users on the left list and add to the right list, click **Confirm** to save the settings.

![Add-member](/img/add-member.png)

### Remove Members from Role

**Remove one member:** Click **Remove** icon of desired user to remove this user from this role.

![Remove-single-user](/img/remove-single-user.png)

**Remove members in bulk:** check the boxes of desired users, click **Remove** button on the top to remove these users from this role.

![Remove-user](/img/remove-user.png)

### Edit Page Permission

Beaver IoT supports managing the visible pages, and available functions of every page the member users use under this role.

1. Select the desired role in the left role list, go to **Permission** page and click **Edit** to edit the page permissions.

2. Check or uncheck all the permissions of the models in the **Page** list, or check or uncheck the parts of permissions of the models in the **Permission** list. 

3. Click **Save** to save the settings. You can check the results by login the users under this role.

   ![Edit-role-permission](/img/edit-role-permission.png)

### Edit Resource Permission

Beaver IoT supports managing the visible and useable resources of every page the member users use under this role.

1. Select the desired role in the left role list, go to **Resources** page to select the corresponding resources pages, and click **Add** to add the permissions.

![Add-resource](/img/add-resource.png)

2. Check the boxes of resources on the left list and add to the right list, click **Confirm** to save the settings.

:::note

- When adding an integration permission to this role, the devices under this integration will be added to **Device Permission** page automatically, and corresponding entity data will display on the **Entity > Entity Data** page of the member accounts.
  :::

![Add-resource-permission](/img/add-resource-permission.png)

3. Click **Remove** icon of desired resource or check the boxes of desired resources and click **Remove** button on the top to remove the resources from this role.

   :::note

   - If a device permission is added automatically when adding an integration permission, this device permission can be not removed separately.  It is necessary to remove the whole integration permission. 
     :::

   ![Delete-resource](/img/delete-resource.png)

