pipeline {
  agent any
  stages {
    stage('Build image') {
      steps {
        sh '''
          cd passmaker
          docker build -t passmaker .
          docker tag passmaker:latest nrdevac1/passmaker:latest
          '''
      }
    }

    stage('Push to ECR') {
      steps {
        sh '''
         docker push nrdevac1/passmaker:latest'''
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