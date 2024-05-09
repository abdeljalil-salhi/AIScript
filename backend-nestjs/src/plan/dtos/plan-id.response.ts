// Dependencies
import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * The plan ID response that contains the monthly and yearly plan IDs.
 *
 * @export
 * @class PlanIdResponse
 */
@InputType()
export class PlanIdResponse {
  @IsString({ message: 'The monthly plan ID must be a string' })
  @Field(() => String, { description: 'The monthly plan ID' })
  public monthly: string;

  @IsString({ message: 'The yearly plan ID must be a string' })
  @Field(() => String, { description: 'The yearly plan ID' })
  public yearly: string;
}
