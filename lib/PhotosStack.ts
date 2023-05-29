import * as cdk from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends cdk.Stack {
  private stackSuffix: string;
  public readonly photosBucketArn: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.initializeSuffix();

    const photosBucket = new Bucket(this, "PhotosBucketTest", {
      bucketName: `photos-bucket-${this.stackSuffix}`,
    });
    //create a resource
    //delete the old one
    this.photosBucketArn = photosBucket.bucketArn;
  }

  // This is appending the last string post - slash to the bucketID
  // This is to avoid the bucket name being too long

  private initializeSuffix() {
    const shortStackId = cdk.Fn.select(2, cdk.Fn.split("/", this.stackId));
    this.stackSuffix = cdk.Fn.select(4, cdk.Fn.split("-", shortStackId));
  }
}
