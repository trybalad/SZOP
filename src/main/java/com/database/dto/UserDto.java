package com.database.dto;

import java.io.Serializable;

public class UserDto implements Serializable {

    private String userId;
    private String name;
    private String profilePic;
    private String email;

    public UserDto() {}

    public UserDto(String userId, String name, String profilePic, String email) {
        this.userId = userId;
        this.name = name;
        this.profilePic = profilePic;
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserDto userDto = (UserDto) o;

        if (userId != null ? !userId.equals(userDto.userId) : userDto.userId != null) return false;
        if (name != null ? !name.equals(userDto.name) : userDto.name != null) return false;
        if (profilePic != null ? !profilePic.equals(userDto.profilePic) : userDto.profilePic != null) return false;
        return email != null ? email.equals(userDto.email) : userDto.email == null;
    }

    @Override
    public int hashCode() {
        int result = userId != null ? userId.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (profilePic != null ? profilePic.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "userId='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", profile_pic='" + profilePic + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
