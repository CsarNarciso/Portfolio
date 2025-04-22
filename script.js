window.onload = function() {
	
	
	//Contact Me section redirections
	
	document.getElementById('emailIcon').onclick = function() {
		
		//Redirect to 'Mail to'
		window.location.href = "mailto:pozolcnarciso@gmail.com";	
	};
	
	document.getElementById('linkedinIcon').onclick = function() {
		
		//Redirect to LinkedIn profile
		window.location.href = "https://www.linkedin.com/in/cesar-pozol-narciso-b48727180/";	
	};
	
	document.getElementById('githubIcon').onclick = function() {
		
		//Redirect to Github profile
		window.location.href = "https://github.com/CsarNarciso";	
	};
	
	
	//Availability project tags redirections
	
	document.getElementById('chatWebProjectAvailabilityTags').querySelector('.sourceCode__icon ').onclick = function() {
		window.location.href = "https://github.com/CsarNarciso/Chat-Web";	
	}
	
	
	document.getElementById('randomSongPlayerProjectAvailabilityTags').querySelector('.sourceCode__icon ').onclick = function() {
		window.location.href = "https://github.com/CsarNarciso/Random-Song-Player";	
	}
	

	document.getElementById('youGotThisProjectAvailabilityTags').querySelector('.tryItOut__icon ').onclick = function() {
		window.location.href = "https://csarnarciso.github.io/You-Got-This/";	
	}
	document.getElementById('youGotThisProjectAvailabilityTags').querySelector('.sourceCode__icon').onclick = function() {
		window.location.href = "https://github.com/CsarNarciso/You-Got-This/";	
	}
	
	
	document.getElementById('driverLifeProjectAvailabilityTags').querySelector('.about__icon ').onclick = function() {
		window.location.href = "https://trackaholics.forumotion.com/t9278-i-want-to-code-an-app-for-gtr2-how-to-access-game-telemetry-data";	
	}
};