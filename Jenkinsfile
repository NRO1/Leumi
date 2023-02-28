pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                echo "installing dependencies"
                sh '''
                cd passmaker
                npm install
                '''
            }
        }
    }
}