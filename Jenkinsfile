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
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    // 2. Logic to handle whether to run a specific group or everything
                    if (params.TEST_GROUP == 'all') {
                        sh 'npx playwright test || true'
                    } else {
                        // Grep flag filters and runs only tests matching the chosen tag
                        sh "npx playwright test --grep ${params.TEST_GROUP} || true"
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