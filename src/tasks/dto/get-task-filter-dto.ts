/* eslint-disable prettier/prettier */
import { TaskStatus } from '../task-status-enum';
import { IsNotEmpty,IsEnum,IsOptional } from "class-validator";
export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
