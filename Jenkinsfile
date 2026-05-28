pipeline {
    agent any

    // 1. Define the parameters at the top
    parameters {
        choice(
            name: 'TEST_GROUP', 
            choices: ['all','@smoke', '@regression', '@sanity'], 
            description: 'Select which test group to run. "all" runs everything.'
        )
    }

    tools {
        nodejs 'node' 
    }

    environment {
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.cache/ms-playwright"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (params.TEST_GROUP == 'all') {
                        // Shortcut for standard execution
                        bat 'npm run test || true'
                    } else {
                        // Appends the parameter tag dynamically to the test:stage script
                        bat "npm run test:stage -- ${params.TEST_GROUP} || true"
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
    }
}