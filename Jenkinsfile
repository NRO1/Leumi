pipeline {
  agent any
  stages {
    stage('Build image') {
      steps {
        sh '''cd passmaker
docker build -t nro1passmaker .
docker tag nro1passmaker:v1 public.ecr.aws/n5h8m9x0/nro1passmaker:v1
docker push public.ecr.aws/n5h8m9x0/nro1passmaker:v1'''
      }
    }

  }
}