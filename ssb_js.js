let selectedPicture = null;
let timerInterval = null;
const PPDT_VIEWING_TIME = 30;
const PPDT_WRITING_TIME = 300;
const TAT_VIEWING_TIME = 30;
const TAT_WRITING_TIME = 240;
const WAT_WORD_TIME = 15;
const SRT_TOTAL_TIME = 1800; // 30 minutes

// Test state variables
let isPaused = false;
let pausedTimeLeft = 0;

// Audio for test completion
const buzzerSound = new Audio('buzzer-buzz-single-sound-effects.mp3');

// TAT variables
let tatCurrentPicture = 1;
const TAT_TOTAL_PICTURES = 12;

// WAT variables
let watCurrentWord = 0;
const watWords = [
    "LEADER", "BRAVE", "HONEST", "FEAR", "SUCCESS", "FAILURE", "TEAM", "COURAGE",
    "DISCIPLINE", "DUTY", "SACRIFICE", "PATRIOT", "VICTORY", "DEFEAT", "TRUST", "BETRAYAL",
    "FRIEND", "ENEMY", "FAMILY", "SOLDIER", "OFFICER", "COMMAND", "OBEY", "RESPECT",
    "DANGER", "SAFETY", "RISK", "CAREFUL", "QUICK", "SLOW", "STRONG", "WEAK",
    "INTELLIGENT", "STUPID", "WISE", "FOOLISH", "CALM", "ANGRY", "HAPPY", "SAD",
    "CONFIDENT", "NERVOUS", "DETERMINED", "LAZY", "ACTIVE", "PASSIVE", "AGGRESSIVE", "PEACEFUL",
    "WAR", "PEACE", "ATTACK", "DEFEND", "RETREAT", "ADVANCE", "STRATEGY", "TACTICS",
    "MISSION", "TARGET", "WEAPON", "SHIELD"
];

// SRT variables
let srtCurrentSituation = 0;
const srtSituations = [
    "You are the leader of a trekking group. Suddenly, one member falls and injures his leg badly. The nearest medical facility is 10 km away. What will you do?",
    "You are traveling by train and notice a suspicious person leaving a bag and hurrying away. What will you do?",
    "You are posted as an officer in a remote area. Your subordinate commits a serious mistake. What will you do?",
    "You are organizing a camp and realize that food supplies are insufficient for all participants. What will you do?",
    "You witness a senior officer being disrespectful to junior staff. What will you do?",
    "You are in charge of a mission and receive contradictory orders from two senior officers. What will you do?",
    "Your friend asks you to help him cheat in an important exam. What will you do?",
    "You are leading a team and one member constantly disrupts the group's progress. What will you do?",
    "You find a wallet with a large amount of money and important documents. What will you do?",
    "You are late for an important parade due to a vehicle breakdown. What will you do?",
    "You are assigned a task that you believe is beyond your current capabilities. What will you do?",
    "You notice a fire breaking out in your neighborhood late at night. What will you do?",
    "Your subordinate is facing a personal crisis affecting his work performance. What will you do?",
    "You are offered a bribe to overlook a minor violation. What will you do?",
    "You are part of a search and rescue team and your team leader makes a wrong decision. What will you do?",
    "You discover that your roommate is involved in illegal activities. What will you do?",
    "You are organizing an event and a VIP guest arrives without prior notice. What will you do?",
    "You are leading a patrol and realize you are lost in unfamiliar territory. What will you do?",
    "Your team disagrees with your decision on an important matter. What will you do?",
    "You see a child drowning in a river and you don't know swimming. What will you do?",
    "You are blamed for a mistake you didn't commit. What will you do?",
    "You have to choose between personal comfort and duty during harsh weather. What will you do?",
    "You notice a colleague is being discriminated against. What will you do?",
    "You are given an impossible deadline for an important task. What will you do?",
    "Your vehicle breaks down in a hostile area during a critical mission. What will you do?",
    "You witness an accident and realize the victim is your rival. What will you do?",
    "You are asked to work on a holiday when you had important family plans. What will you do?",
    "You discover confidential information has been leaked from your unit. What will you do?",
    "You are organizing supplies and find some items are of substandard quality. What will you do?",
    "You see smoke coming from a nearby building while on patrol. What will you do?",
    "Your junior makes a serious error that could affect the entire team. What will you do?",
    "You are stuck in a traffic jam and getting late for an important meeting. What will you do?",
    "You find that equipment provided for training is faulty. What will you do?",
    "You are asked to do something that goes against your personal values. What will you do?",
    "A family emergency arises during an important duty. What will you do?",
    "You notice a fellow officer is under severe stress. What will you do?",
    "You are offered a promotion if you compromise on your principles. What will you do?",
    "You realize you have made a significant error in an official report. What will you do?",
    "You see a senior officer violating safety protocols. What will you do?",
    "Your team is exhausted but the mission is incomplete. What will you do?",
    "You discover misuse of government resources in your unit. What will you do?",
    "You are asked to take credit for someone else's work. What will you do?",
    "You find a critically injured person in a remote area with no help nearby. What will you do?",
    "Your subordinate requests leave during a critical operation. What will you do?",
    "You are offered a shortcut to complete a task that involves bending rules. What will you do?",
    "You notice a pattern of favoritism in your unit. What will you do?",
    "You are leading a group and face unexpected hostile resistance. What will you do?",
    "Your senior officer gives you an order you believe is unethical. What will you do?",
    "You realize your team is unprepared for an upcoming inspection. What will you do?",
    "You witness bullying in your unit. What will you do?",
    "You are running out of rations during a prolonged field exercise. What will you do?",
    "You receive information about a potential security threat. What will you do?",
    "Your colleague is spreading false rumors about you. What will you do?",
    "You find critical equipment missing before an important operation. What will you do?",
    "You are asked to work with someone you have personal differences with. What will you do?",
    "You notice a subordinate showing signs of substance abuse. What will you do?",
    "You are in a survival situation with limited resources. What will you do?",
    "You discover someone has been taking credit for your work. What will you do?",
    "You are asked to compromise quality to meet a deadline. What will you do?",
    "You witness an act of valor that goes unnoticed. What will you do?"
];

// Show Loading
function showLoading() {
    document.getElementById('loadingIndicator').classList.remove('hidden');
}

// Hide Loading
function hideLoading() {
    document.getElementById('loadingIndicator').classList.add('hidden');
}

// Select Test
async function selectTest(testType) {
    document.getElementById('testSelection').classList.add('hidden');
    
    if (testType === 'ppdt') {
        document.getElementById('ppdtSection').classList.remove('hidden');
        document.getElementById('ppdtSelection').classList.remove('hidden');
        populatePPDTDropdown();
    } else if (testType === 'tat') {
        document.getElementById('tatSection').classList.remove('hidden');
        document.getElementById('tatInstructions').classList.remove('hidden');
    } else if (testType === 'wat') {
        document.getElementById('watSection').classList.remove('hidden');
        document.getElementById('watInstructions').classList.remove('hidden');
    } else if (testType === 'srt') {
        document.getElementById('srtSection').classList.remove('hidden');
        document.getElementById('srtInstructions').classList.remove('hidden');
    }
}

// Populate PPDT Dropdown with 30 pictures
function populatePPDTDropdown() {
    const dropdown = document.getElementById('ppdtPictureSelect');
    dropdown.innerHTML = '<option value="">-- Select Picture --</option>';
    
    for (let i = 1; i <= 30; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Picture ${i}`;
        dropdown.appendChild(option);
    }
}

// Select Picture from Dropdown
function selectPictureFromDropdown() {
    const dropdown = document.getElementById('ppdtPictureSelect');
    const pictureNumber = dropdown.value;
    
    if (!pictureNumber) {
        alert('Please select a picture number first.');
        return;
    }
    
    selectedPicture = pictureNumber;
    document.getElementById('ppdtSelection').classList.add('hidden');
    document.getElementById('ppdtInstructions').classList.remove('hidden');
}

// Confirm Back to Home during test
function confirmBackToHome() {
    const confirmed = confirm("⚠️ Are you sure you want to exit this test?\n\nAll progress will be lost and you will return to test selection.");
    
    if (confirmed) {
        // Clear timer
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        // Reset state
        isPaused = false;
        pausedTimeLeft = 0;
        
        // Reset test-specific variables
        tatCurrentPicture = 1;
        watCurrentWord = 0;
        srtCurrentSituation = 0;
        selectedPicture = null;
        
        // Go back to test selection
        backToTests();
    }
}

// Back to Tests
function backToTests() {
    // Hide all sections
    document.querySelectorAll('.test-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Hide all sub-sections within tests
    document.querySelectorAll('.test-screen, .instructions, .test-complete, .picture-selection').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show test selection
    document.getElementById('testSelection').classList.remove('hidden');
    
    // Clear timers
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Reset pause state
    isPaused = false;
    pausedTimeLeft = 0;
    
    // Reset pause button if it exists
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
        pauseBtn.textContent = '⏸️ Pause';
        pauseBtn.style.background = '#ffd700';
    }
}

// Start PPDT Test
function startPPDT() {
    document.getElementById('ppdtInstructions').classList.add('hidden');
    document.getElementById('ppdtTest').classList.remove('hidden');
    
    // Set picture source
    document.getElementById('testPicture').src = `ppdt/PPDT_${selectedPicture}.jpg`;
    
    // Start viewing phase
    startViewingPhase();
}

// Start Viewing Phase (30 seconds)
function startViewingPhase() {
    let timeLeft = PPDT_VIEWING_TIME;
    document.getElementById('timerLabel').textContent = 'Viewing Time Remaining';
    document.getElementById('pictureDisplay').classList.remove('hidden');
    document.getElementById('writingInstructions').classList.add('hidden');
    
    updateTimer(timeLeft);
    
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            pausedTimeLeft = timeLeft;
            updateTimer(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                startWritingPhase();
            }
        }
    }, 1000);
}

// Start Writing Phase (5 minutes)
function startWritingPhase() {
    let timeLeft = PPDT_WRITING_TIME;
    document.getElementById('timerLabel').textContent = 'Writing Time Remaining';
    document.getElementById('pictureDisplay').classList.add('hidden');
    document.getElementById('writingInstructions').classList.remove('hidden');
    
    updateTimer(timeLeft);
    
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            pausedTimeLeft = timeLeft;
            updateTimer(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                buzzerSound.play();
                endTest();
            }
        }
    }, 1000);
}

function resumePPDT() {
    if (pausedTimeLeft > 0) {
        let timeLeft = pausedTimeLeft;
        
        // Check if in viewing or writing phase
        if (document.getElementById('pictureDisplay').classList.contains('hidden')) {
            // Writing phase
            timerInterval = setInterval(() => {
                if (!isPaused) {
                    timeLeft--;
                    pausedTimeLeft = timeLeft;
                    updateTimer(timeLeft);
                    
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        buzzerSound.play();
                        endTest();
                    }
                }
            }, 1000);
        } else {
            // Viewing phase
            timerInterval = setInterval(() => {
                if (!isPaused) {
                    timeLeft--;
                    pausedTimeLeft = timeLeft;
                    updateTimer(timeLeft);
                    
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        startWritingPhase();
                    }
                }
            }, 1000);
        }
    }
}

// Update Timer Display
function updateTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// End Test
function endTest() {
    document.getElementById('ppdtTest').classList.add('hidden');
    document.getElementById('ppdtComplete').classList.remove('hidden');
}

// Restart PPDT
function restartPPDT() {
    document.getElementById('ppdtComplete').classList.add('hidden');
    document.getElementById('ppdtSelection').classList.remove('hidden');
}

// === TAT Functions ===
function startTAT() {
    tatCurrentPicture = 1;
    document.getElementById('tatInstructions').classList.add('hidden');
    document.getElementById('tatTest').classList.remove('hidden');
    showTATPicture();
}

function showTATPicture() {
    document.getElementById('tatTestPicture').src = `TAT/TAT_${tatCurrentPicture}.jpg`;
    document.getElementById('tatPictureDisplay').classList.remove('hidden');
    document.getElementById('tatWritingInstructions').classList.add('hidden');
    
    let timeLeft = TAT_VIEWING_TIME;
    document.getElementById('tatTimerLabel').textContent = 
        `Picture ${tatCurrentPicture} of ${TAT_TOTAL_PICTURES} - Viewing Time`;
    updateTATTimer(timeLeft);
    
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            pausedTimeLeft = timeLeft;
            updateTATTimer(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                startTATWriting();
            }
        }
    }, 1000);
}

function startTATWriting() {
    document.getElementById('tatPictureDisplay').classList.add('hidden');
    document.getElementById('tatWritingInstructions').classList.remove('hidden');
    
    let timeLeft = TAT_WRITING_TIME;
    document.getElementById('tatTimerLabel').textContent = 
        `Picture ${tatCurrentPicture} of ${TAT_TOTAL_PICTURES} - Writing Time`;
    updateTATTimer(timeLeft);
    
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            pausedTimeLeft = timeLeft;
            updateTATTimer(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                buzzerSound.play();
                nextTATPicture();
            }
        }
    }, 1000);
}

function nextTATPicture() {
    tatCurrentPicture++;
    if (tatCurrentPicture <= TAT_TOTAL_PICTURES) {
        showTATPicture();
    } else {
        endTAT();
    }
}

function resumeTAT() {
    if (pausedTimeLeft > 0) {
        let timeLeft = pausedTimeLeft;
        
        // Check if in viewing or writing phase
        if (document.getElementById('tatPictureDisplay').classList.contains('hidden')) {
            // Writing phase
            timerInterval = setInterval(() => {
                if (!isPaused) {
                    timeLeft--;
                    pausedTimeLeft = timeLeft;
                    updateTATTimer(timeLeft);
                    
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        buzzerSound.play();
                        nextTATPicture();
                    }
                }
            }, 1000);
        } else {
            // Viewing phase
            timerInterval = setInterval(() => {
                if (!isPaused) {
                    timeLeft--;
                    pausedTimeLeft = timeLeft;
                    updateTATTimer(timeLeft);
                    
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        startTATWriting();
                    }
                }
            }, 1000);
        }
    }
}

function updateTATTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('tatTimer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function endTAT() {
    document.getElementById('tatTest').classList.add('hidden');
    document.getElementById('tatComplete').classList.remove('hidden');
}

function restartTAT() {
    document.getElementById('tatComplete').classList.add('hidden');
    document.getElementById('tatInstructions').classList.remove('hidden');
}

// === WAT Functions ===
function startWAT() {
    watCurrentWord = 0;
    document.getElementById('watInstructions').classList.add('hidden');
    document.getElementById('watTest').classList.remove('hidden');
    showWATWord();
}

function showWATWord() {
    if (watCurrentWord >= watWords.length) {
        endWAT();
        return;
    }
    
    const word = watWords[watCurrentWord];
    document.getElementById('currentWord').textContent = word;
    document.getElementById('watTimerLabel').textContent = 
        `Word ${watCurrentWord + 1} of ${watWords.length}`;
    
    let timeLeft = WAT_WORD_TIME;
    updateWATTimer(timeLeft);
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateWATTimer(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            watCurrentWord++;
            showWATWord();
        }
    }, 1000);
}

function updateWATTimer(seconds) {
    document.getElementById('watTimer').textContent = 
        `00:${seconds.toString().padStart(2, '0')}`;
}

function endWAT() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    document.getElementById('watTest').classList.add('hidden');
    document.getElementById('watComplete').classList.remove('hidden');
}

function restartWAT() {
    document.getElementById('watComplete').classList.add('hidden');
    document.getElementById('watInstructions').classList.remove('hidden');
}

// === SRT Functions ===
function startSRT() {
    srtCurrentSituation = 0;
    document.getElementById('srtInstructions').classList.add('hidden');
    document.getElementById('srtTest').classList.remove('hidden');
    showSRTSituation();
    startSRTTimer();
}

function showSRTSituation() {
    if (srtCurrentSituation >= srtSituations.length) {
        endSRT();
        return;
    }
    
    const situation = srtSituations[srtCurrentSituation];
    
    document.getElementById('situationNumber').textContent = 
        `Situation ${srtCurrentSituation + 1}`;
    document.getElementById('situationText').textContent = situation;
    document.getElementById('srtTimerLabel').textContent = 
        `Situation ${srtCurrentSituation + 1} of ${srtSituations.length}`;
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = srtCurrentSituation === 0;
    document.getElementById('nextBtn').textContent = 
        srtCurrentSituation === srtSituations.length - 1 ? 'Finish' : 'Next →';
}

function startSRTTimer() {
    let timeLeft = SRT_TOTAL_TIME;
    pausedTimeLeft = timeLeft;
    updateSRTTimer(timeLeft);
    
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            pausedTimeLeft = timeLeft;
            updateSRTTimer(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endSRT();
            }
        }
    }, 1000);
}

function updateSRTTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('srtTimer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function previousSituation() {
    if (srtCurrentSituation > 0) {
        srtCurrentSituation--;
        showSRTSituation();
    }
}

function nextSituation() {
    if (srtCurrentSituation < srtSituations.length - 1) {
        srtCurrentSituation++;
        showSRTSituation();
    } else {
        endSRT();
    }
}

function resumeSRT() {
    if (pausedTimeLeft > 0) {
        let timeLeft = pausedTimeLeft;
        
        timerInterval = setInterval(() => {
            if (!isPaused) {
                timeLeft--;
                pausedTimeLeft = timeLeft;
                updateSRTTimer(timeLeft);
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    endSRT();
                }
            }
        }, 1000);
    }
}

function endSRT() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    document.getElementById('srtTest').classList.add('hidden');
    document.getElementById('srtComplete').classList.remove('hidden');
}

function restartSRT() {
    document.getElementById('srtComplete').classList.add('hidden');
    document.getElementById('srtInstructions').classList.remove('hidden');
}

// Pause/Resume Test
function pauseTest() {
    const pauseBtn = document.getElementById('pauseBtn');
    
    if (!isPaused) {
        // Pause the test
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        isPaused = true;
        pauseBtn.textContent = '▶️ Resume';
        pauseBtn.style.background = '#4caf50';
    } else {
        // Resume the test
        isPaused = false;
        pauseBtn.textContent = '⏸️ Pause';
        pauseBtn.style.background = '#ffc107';
        resumeCurrentTest();
    }
}

function resumeCurrentTest() {
    // Detect which test is running and resume it
    const ppdtTest = document.getElementById('ppdtTest');
    const tatTest = document.getElementById('tatTest');
    const watTest = document.getElementById('watTest');
    const srtTest = document.getElementById('srtTest');
    
    if (ppdtTest && !ppdtTest.classList.contains('hidden')) {
        resumePPDT();
    } else if (tatTest && !tatTest.classList.contains('hidden')) {
        resumeTAT();
    } else if (watTest && !watTest.classList.contains('hidden')) {
        resumeWAT();
    } else if (srtTest && !srtTest.classList.contains('hidden')) {
        resumeSRT();
    }
}

// Material Viewer Functions
function openMaterialViewer() {
    document.getElementById('testSelection').classList.add('hidden');
    document.getElementById('materialViewer').classList.remove('hidden');
    loadAllMaterials();
}

function closeMaterialViewer() {
    document.getElementById('materialViewer').classList.add('hidden');
    document.getElementById('testSelection').classList.remove('hidden');
}

function loadAllMaterials() {
    // Load PPDT images - now showing all 30
    const ppdtContainer = document.getElementById('ppdtMaterials');
    ppdtContainer.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
        ppdtContainer.innerHTML += `
            <div class="material-item" onclick="openImageModal('ppdt/PPDT_${i}.jpg', 'PPDT Picture ${i}')">
                <img src="ppdt/PPDT_${i}.jpg" alt="PPDT ${i}">
                <p>PPDT Picture ${i}</p>
            </div>
        `;
    }
    
    // Load TAT images
    const tatContainer = document.getElementById('tatMaterials');
    tatContainer.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
        tatContainer.innerHTML += `
            <div class="material-item" onclick="openImageModal('TAT/TAT_${i}.jpg', 'TAT Picture ${i}')">
                <img src="TAT/TAT_${i}.jpg" alt="TAT ${i}">
                <p>TAT Picture ${i}</p>
            </div>
        `;
    }
    
    // Load WAT words
    const watContainer = document.getElementById('watMaterials');
    watContainer.innerHTML = '<div class="word-list">';
    watWords.forEach((word, index) => {
        watContainer.innerHTML += `<span class="word-chip">${index + 1}. ${word}</span>`;
    });
    watContainer.innerHTML += '</div>';
    
    // Load SRT situations
    const srtContainer = document.getElementById('srtMaterials');
    srtContainer.innerHTML = '';
    srtSituations.forEach((situation, index) => {
        srtContainer.innerHTML += `
            <div class="situation-item">
                <strong>Situation ${index + 1}:</strong>
                <p>${situation}</p>
            </div>
        `;
    });
}

// Image Modal Functions
function openImageModal(imageSrc, imageTitle) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modal.classList.remove('hidden');
    modalImg.src = imageSrc;
    modalCaption.textContent = imageTitle;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeImageModal();
    }
}
