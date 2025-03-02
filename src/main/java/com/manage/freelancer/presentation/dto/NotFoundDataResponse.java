package com.manage.freelancer.presentation.dto;

import java.util.List;

import com.manage.freelancer.domain.entity.NotFound;
import lombok.Getter;

@Getter
public class NotFoundDataResponse {
     private List<NotFound> list;

     public NotFoundDataResponse(List<NotFound> list) {
          this.list = list;
     }

}
