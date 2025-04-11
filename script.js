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
	
	document.getElementById('driverLifeProjectAvailabilityTags').querySelector('.website__icon ').onclick = function() {
		window.location.href = "https://trackaholics.forumotion.com/t9278-i-want-to-code-an-app-for-gtr2-how-to-access-game-telemetry-data";	
	}
	
	document.getElementById('driverLifeProjectAvailabilityTags').querySelector('.download__icon ').onclick = function() {
		window.location.href = "https://www.mediafire.com/file/rj86k0f3m2uumye/DriverLife.zip/file";	
	}
};