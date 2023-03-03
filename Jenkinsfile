pipeline {
  agent any

   environment {
        AMI = 'ami-0c0933ae5caf0f5f9'
        COUNT = '1'
        TYPE = 't2.micro'
        KP = 'k8s_instance'
        SG = 'sg-0ca59d5f6debb7b3b'
        SN ='subnet-9986f7f3'
    }

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

    stage('Push to Repo') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dh_cred', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh '''
            docker login -u $USERNAME -p $PASSWORD
            docker push nrdevac1/passmaker:latest
            base64 ec2_load_script.txt > ec2_laod_scripts_64.txt
            '''
          }
      }
    }

    stage('load EC2 with k8s') {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: "aws_cred",
          accessKeyVariable: 'AWS_ACCESS_KEY_ID',
          secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
        ]]) {
          sh '''
            aws ec2 run-instances --image-id ${AMI} --count ${COUNT} --instance-type ${TYPE}  --key-name ${KP} --security-group-ids ${SG} --subnet-id ${SN} --user-data file://ec2_load_script.txt 
            sleep 40
            pwd
            cd /
            kubectl apply -f passmaker.yaml
             '''
           }
      }
    }
  }
}

