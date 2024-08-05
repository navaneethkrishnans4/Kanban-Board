package com.niit.TaskService.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Status {
    @Id
    private String statusCode;
    private String statusTitle;
    private String statusColour;

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusTitle() {
        return statusTitle;
    }

    public void setStatusTitle(String statusTitle) {
        this.statusTitle = statusTitle;
    }

    public String getStatusColour() {
        return statusColour;
    }

    public void setStatusColour(String statusColour) {
        this.statusColour = statusColour;
    }

    @Override
    public String toString() {
        return "Status{" +
                "statusCode='" + statusCode + '\'' +
                ", statusTitle='" + statusTitle + '\'' +
                ", statusColour='" + statusColour + '\'' +
                '}';
    }
}
