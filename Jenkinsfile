pipeline {
  agent any
  stages {
    stage('Build image') {
      steps {
        sh '''
          cd passmaker
          docker build -t passmaker .
          docker tag passmaker:latest public.ecr.aws/g8g2r1o6/passmaker:latest
          '''
      }
    }

    stage('Push to ECR') {
      steps {
        sh '''
          aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/g8g2r1o6
          docker push public.ecr.aws/g8g2r1o6/passmaker:latest
          '''
      }
    }

    stage('load EC2 with k8s') {
      steps {
        sh 'echo "loading ec2"'
      }
    }

    stage('deploy image to ec2') {
      steps {
        sh 'echo "deploy image to ec2"'
      }
    }

  }
}