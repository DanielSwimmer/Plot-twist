import * as vscode from 'vscode';

let chibiPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Chibi Motivator is now active!');
    
    let disposable = vscode.commands.registerCommand('chibi-motivator.showChibi', () => {
        showChibi(context);
    });

    context.subscriptions.push(disposable);
    
}

function showChibi(context: vscode.ExtensionContext) {
    if (chibiPanel) {
        chibiPanel.reveal();
        return;
    }

    chibiPanel = vscode.window.createWebviewPanel(
        'chibiPanel',
        'Chibi Companion 🎀',
        vscode.ViewColumn.Beside,
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
    );

    chibiPanel.webview.html = getWebviewContent();

    chibiPanel.onDidDispose(() => {
        chibiPanel = undefined;
    }, null, context.subscriptions);
}

function getWebviewContent(): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                overflow: hidden;
                font-family: 'Arial', sans-serif;
            }
            
            .chibi-container {
                text-align: center;
                position: relative;
            }
            
            .chibi-image {
                width: 150px;
                height: 150px;
                border-radius: 20px;
                margin: 0 auto 25px;
                animation: bounce 2s infinite ease-in-out;
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                object-fit: cover;
                border: 4px solid white;
            }
            
            .chibi-image:hover {
                transform: scale(1.05);
                box-shadow: 0 15px 35px rgba(0,0,0,0.4);
            }
            
            .motivation-text {
                color: white;
                font-size: 22px;
                font-weight: bold;
                text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
                margin-bottom: 15px;
                animation: glow 2s infinite alternate;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                padding: 10px 20px;
                border-radius: 15px;
            }
            
            .subtitle {
                color: rgba(255,255,255,0.8);
                font-size: 14px;
                margin-top: 10px;
            }
            
            /* Простые частицы */
            .particle {
                position: absolute;
                pointer-events: none;
                font-size: 20px;
                z-index: 1000;
            }
            
            /* Анимации */
            @keyframes bounce {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                25% { transform: translateY(-15px) rotate(3deg); }
                50% { transform: translateY(-5px) rotate(0deg); }
                75% { transform: translateY(-10px) rotate(-3deg); }
            }
            
            @keyframes glow {
                0% { text-shadow: 0 0 10px #ff6b6b, 0 0 20px #ff6b6b; }
                100% { text-shadow: 0 0 20px #4ecdc4, 0 0 30px #4ecdc4; }
            }
            
            @keyframes heartBeat {
                0% { transform: scale(1); }
                25% { transform: scale(1.3); }
                50% { transform: scale(1); }
                75% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
        </style>
    </head>
    <body>
        <div class="chibi-container">
            <div class="motivation-text">Ты сможешь, давай! 💪</div>
            
            <img class="chibi-image" id="chibiImage" 
                 src="https://i.pinimg.com/736x/12/46/c8/1246c8f99a0b4c29f0a803835086e866.jpg" 
                 alt="Cute Chibi"
                 onerror="this.src='https://i.pinimg.com/736x/12/46/c8/1246c8f99a0b4c29f0a803835086e866.jpg'">
            
            <div class="subtitle">Нажми на чибика для мотивации! ✨</div>
        </div>
        
        <script>
            const chibiImage = document.getElementById('chibiImage');
            const motivationText = document.querySelector('.motivation-text');
            
            // Коллекция милых чибиков (можно добавить свои ссылки)
            const chibiImages = [
                "https://i.pinimg.com/736x/12/46/c8/1246c8f99a0b4c29f0a803835086e866.jpg",  // Милый аниме чибик
                "https://i.pinimg.com/736x/12/46/c8/1246c8f99a0b4c29f0a803835086e866.jpg",  // Другой чибик
                "https://i.pinimg.com/736x/12/46/c8/1246c8f99a0b4c29f0a803835086e866.jpg",
                "https://i.pinimg.com/236x/8c/8c/8c/8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c.jpg",
                "https://i.pinimg.com/736x/12/46/c8/1246c8f99a0b4c29f0a803835086e866.jpg"
            ];
            
            const messages = [
                "Ты сможешь, давай! 💪",
                "У тебя всё получится! 🚀", 
                "Не сдавайся! 🌟",
                "Ты молодец! 🎯",
                "Вперёд к победе! ⚡",
                "Ты гениален! 💡",
                "Продолжай в том же духе! 🌈",
                "Супер работа! 🏆"
            ];
            
            let clickCount = 0;
            
            chibiImage.addEventListener('click', function(event) {
                clickCount++;
                
                console.log('Чибик нажат! Создаём анимации...');
                
                // Эффект 1: Простой взрыв частиц
                createSimpleParticles(event.clientX, event.clientY);
                
                // Эффект 2: Простые конфетти
                createSimpleConfetti();
                
                // Эффект 3: Пульсация текста
                motivationText.style.animation = 'none';
                setTimeout(() => {
                    motivationText.style.animation = 'glow 2s infinite alternate';
                }, 10);
                
                // Эффект 4: Сердцебиение чибика
                chibiImage.style.animation = 'heartBeat 0.6s ease';
                setTimeout(() => {
                    chibiImage.style.animation = 'bounce 2s infinite ease-in-out';
                }, 600);
                
                // Эффект 5: Смена сообщения (каждые 3 клика)
                if (clickCount % 3 === 0) {
                    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                    motivationText.textContent = randomMessage;
                }
                
                // Эффект 6: Смена картинки чибика (каждые 2 клика)
                if (clickCount % 2 === 0) {
                    const randomImage = chibiImages[Math.floor(Math.random() * chibiImages.length)];
                    chibiImage.src = randomImage;
                }
                
                // Эффект 7: Вращение и тень
                chibiImage.style.transform = 'scale(1.2) rotate(15deg)';
                chibiImage.style.boxShadow = '0 20px 40px rgba(255,107,107,0.5)';
                
                setTimeout(() => {
                    chibiImage.style.transform = '';
                    chibiImage.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                }, 300);
            });
            
            function createSimpleParticles(x, y) {
                const particles = ['✨', '🌟', '🎉', '💫', '⭐', '🔥', '💖', '🎊'];
                
                for (let i = 0; i < 8; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                    particle.style.left = x + 'px';
                    particle.style.top = y + 'px';
                    particle.style.color = getRandomColor();
                    particle.style.fontSize = (15 + Math.random() * 15) + 'px';
                    
                    document.body.appendChild(particle);
                    
                    // Простая анимация через transform
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 30 + Math.random() * 70;
                    const moveX = Math.cos(angle) * distance;
                    const moveY = Math.sin(angle) * distance;
                    
                    particle.style.transition = 'all 0.8s ease-out';
                    
                    // Запускаем анимацию
                    setTimeout(() => {
                        particle.style.transform = \`translate(\${moveX}px, \${moveY}px) scale(0)\`;
                        particle.style.opacity = '0';
                    }, 10);
                    
                    // Удаление после анимации
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.remove();
                        }
                    }, 800);
                }
            }
            
            function createSimpleConfetti() {
                const confettiTypes = ['🎀', '🌟', '💖', '⭐'];
                
                for (let i = 0; i < 6; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'particle';
                    confetti.textContent = confettiTypes[Math.floor(Math.random() * confettiTypes.length)];
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.top = '-30px';
                    confetti.style.fontSize = (12 + Math.random() * 15) + 'px';
                    confetti.style.color = getRandomColor();
                    
                    document.body.appendChild(confetti);
                    
                    // Простая анимация падения
                    const duration = 1 + Math.random();
                    const moveY = 100 + Math.random() * 50;
                    const rotate = 180 + Math.random() * 180;
                    
                    confetti.style.transition = \`all \${duration}s ease-in\`;
                    
                    setTimeout(() => {
                        confetti.style.transform = \`translateY(\${moveY}px) rotate(\${rotate}deg)\`;
                        confetti.style.opacity = '0';
                    }, 10);
                    
                    // Удаление после анимации
                    setTimeout(() => {
                        if (confetti.parentNode) {
                            confetti.remove();
                        }
                    }, duration * 1000 + 100);
                }
            }
            
            function getRandomColor() {
                const colors = [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
                    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            // Автоматическая смена сообщения каждые 10 секунд
            setInterval(() => {
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                motivationText.textContent = randomMessage;
            }, 10000);
            
            // Автоматическая смена картинки каждые 15 секунд
            setInterval(() => {
                const randomImage = chibiImages[Math.floor(Math.random() * chibiImages.length)];
                chibiImage.src = randomImage;
            }, 15000);
            
            console.log('Чибик с картинкой готов к работе!');
        </script>
    </body>
    </html>`;
}

export function deactivate() {
    if (chibiPanel) {
        chibiPanel.dispose();
    }
}