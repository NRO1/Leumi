pipeline {
  agent any
  stages {
    stage('Acsses ECR') {
      steps {
        sh '''aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/n5h8m9x0
'''
      }
    }

    stage('Build image') {
      steps {
        sh '''docker build -t nro1passmaker .
docker tag nro1passmaker:v1 public.ecr.aws/n5h8m9x0/nro1passmaker:v1
docker push public.ecr.aws/n5h8m9x0/nro1passmaker:v1'''
      }
    }

  }
}