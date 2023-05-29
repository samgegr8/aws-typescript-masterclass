import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);
    new Bucket(this, "MyL3Bucket", {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(expiration),
        },
      ],
    });
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //create a s3 bucket
    new CfnBucket(this, "MyL1Bucket", {
      lifecycleConfiguration: {
        rules: [{ status: "Enabled", expirationInDays: 2 }],
      },
    });

    const duration = new cdk.CfnParameter(this, "duration", {
      default: 6,
      maxValue: 10,
      minValue: 1,
      type: "Number",
    });

    const myL2bucket = new Bucket(this, "MyL2Bucket", {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(duration.valueAsNumber),
        },
      ],
    });

    new cdk.CfnOutput(this, "MyL2BucketName", { value: myL2bucket.bucketName });

    new L3Bucket(this, "L3Bucket", 4);
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkStarterQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
