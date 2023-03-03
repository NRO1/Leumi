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
            aws ec2 run-instances --image-id ${AMI} --count ${COUNT} --instance-type ${TYPE}  --key-name ${KP} --security-group-ids ${SG} --subnet-id ${SN} 
            sleep 20

            if [ ! -f "~/passmaker.yaml" ]
              then
                sudo cat > ~/passmaker.yaml <<EOF
                    apiVersion: apps/v1
                    kind: Deployment
                    metadata:
                      name: passmaker
                      labels:
                        app: passmaker
                    spec:
                      replicas: 1
                      selector:
                        matchLabels:
                          app: passmaker
                      template:
                        metadata:
                          labels:
                            app: passmaker
                        spec:
                          containers:
                          - name: passmaker
                            image: nrdevac1/passmaker:latest
                            ports:
                            - containerPort: 80
                            resources:
                              limits: 
                                memory: "500Mi"
                                cpu: "500m"
                    ---
                    apiVersion: v1
                    kind: Service
                    metadata:
                      name: passmaker-svc
                    spec:
                      selector:
                        app.kubernetes.io/name: passmaker
                      ports:
                        - protocol: TCP
                          port: 443
                          targetPort: 80
                EOF

            curl -sSLf https://get.k0s.sh | sh
            curl --output /usr/local/sbin/kubectl -L "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
            sudo chmod +x /usr/local/sbin/kubectl
            sudo chmod  +x /usr/local/bin/k0s
            mkdir -p ${HOME}/.k0s
            k0s default-config | tee ${HOME}/.k0s/k0s.yaml
            sudo k0s server -c ${HOME}/.k0s/k0s.yaml --enable-worker &
            sudo cat /var/lib/k0s/pki/admin.conf | tee ~/.k0s/kubeconfig
            export KUBECONFIG="${HOME}/.k0s/kubeconfig"
            kubectl apply -f passmaker.yaml
             '''
           }
      }
    }
  }
}

