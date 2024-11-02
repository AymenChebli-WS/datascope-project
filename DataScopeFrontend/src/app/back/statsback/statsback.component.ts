import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import { Offer } from 'src/app/models/offer.model';

Chart.register(...registerables); // Register all necessary components

@Component({
  selector: 'app-statsback',
  templateUrl: './statsback.component.html',
  styleUrls: ['./statsback.component.css']
})
export class StatsbackComponent {
  public enterpriseData: any[] = [];
  public typeData: any[] = [];
  public skillsData: any[] = [];
  public tasksData: any[] = [];

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.fetchOfferStatistics();
  }

  fetchOfferStatistics() {
    this.offerService.getOffers().subscribe((offers) => {
      this.enterpriseData = this.calculateOffersByEnterprise(offers);
      this.typeData = this.calculateOffersByType(offers);
      this.skillsData = this.calculateOffersBySkills(offers);
      this.tasksData = this.calculateOffersByTasks(offers);
      this.createCharts();
    });
  }

  calculateOffersByEnterprise(offers: Offer[]) {
    const enterpriseCount: { [key: string]: number } = {};

    offers.forEach(offer => {
      const enterpriseName = offer.enterprise;
      if (enterpriseCount[enterpriseName]) {
        enterpriseCount[enterpriseName]++;
      } else {
        enterpriseCount[enterpriseName] = 1;
      }
    });

    return Object.keys(enterpriseCount).map(enterprise => ({
      enterprise,
      count: enterpriseCount[enterprise]
    }));
  }

  calculateOffersByType(offers: Offer[]) {
    const typeCount: { [key: string]: number } = {};

    offers.forEach(offer => {
      const offerType = offer.type;
      if (typeCount[offerType]) {
        typeCount[offerType]++;
      } else {
        typeCount[offerType] = 1;
      }
    });

    return Object.keys(typeCount).map(type => ({
      type,
      count: typeCount[type]
    }));
  }

  calculateOffersBySkills(offers: Offer[]) {
    const skillCount: { [key: string]: number } = {};

    offers.forEach(offer => {
      offer.skills.forEach(skill => {
        if (skillCount[skill]) {
          skillCount[skill]++;
        } else {
          skillCount[skill] = 1;
        }
      });
    });

    return Object.keys(skillCount).map(skill => ({
      skill,
      count: skillCount[skill]
    }));
  }

  calculateOffersByTasks(offers: Offer[]) {
    const taskCount: { [key: string]: number } = {};

    offers.forEach(offer => {
        offer.tasks.forEach(task => {
            const shortTask = task.length > 40 ? task.slice(0, 40) + '...' : task; // Limit task name to 15 characters
            if (taskCount[shortTask]) {
                taskCount[shortTask]++;
            } else {
                taskCount[shortTask] = 1;
            }
        });
    });

    return Object.keys(taskCount).map(task => ({
        task,
        count: taskCount[task]
    }));
}

  

  createCharts() {
    const ctx1 = document.getElementById('enterpriseChart') as HTMLCanvasElement;
    const ctx2 = document.getElementById('typeChart') as HTMLCanvasElement;
    const ctx3 = document.getElementById('skillsChart') as HTMLCanvasElement;
    const ctx4 = document.getElementById('tasksChart') as HTMLCanvasElement;

    // Doughnut Chart for enterprises
    new Chart(ctx1, {
      type: 'doughnut', // Change to doughnut
      data: {
        labels: this.enterpriseData.map(item => item.enterprise),
        datasets: [{
          label: '# of Offers',
          data: this.enterpriseData.map(item => item.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Offers by Enterprise'
          }
        }
      }
    });

    // Bar Chart for types
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: this.typeData.map(item => item.type),
        datasets: [{
          label: '# of Offers',
          data: this.typeData.map(item => item.count),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Pie Chart for skills
    new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: this.skillsData.map(item => item.skill),
        datasets: [{
          label: '# of Offers',
          data: this.skillsData.map(item => item.count),
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              generateLabels: (chart) => {
                const original = Chart.overrides.pie.plugins.legend.labels.generateLabels(chart);
                const maxLabelsToShow = 7; // Change this number to control how many labels to show
    
                // Return only the top N labels based on value
                return original.slice(0, maxLabelsToShow);
              },
            },
          },
          title: {
            display: true,
            text: 'Offers by Skills'
          }
        }
      }
    });

    // Radar Chart for tasks
// Radar Chart for tasks
new Chart(ctx4, {
  type: 'radar',
  data: {
    labels: this.tasksData.map(item => item.task),
    datasets: [{
      label: '# of Offers with Task',
      data: this.tasksData.map(item => item.count),
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
      fill: true
    }]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        ticks: {
          display: false, // Hides the ticks (text around the chart)
        },
        grid: {
          display: true // Keep grid lines visible if desired
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const count = tooltipItem.raw; // Gets the raw data point
            return `${label}: ${count}`; // Returns a string to display
          }
        },
        enabled: true // Ensure tooltips are enabled
      },
      legend: {
        display: false, // Hides the legend if not needed
      },
      title: {
        display: true,
        text: 'Offers by Task Type'
      },
      // This block ensures labels are not displayed
      
    }
  }
});


    
  }
}
