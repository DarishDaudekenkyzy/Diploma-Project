using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReviewAppProject.Data.Models;
using ReviewAppProject.Data.Repository.Interfaces;
using ReviewAppProject.Exceptions;
using ReviewAppProject.Models;
using System;

namespace ReviewAppProject.Data.Repository
{
    public class FacultyRepository : IFacultyRepository
    {
        private readonly AppDbContext _context;

        public FacultyRepository(AppDbContext context)
        {
            _context = context;
        }

        public async IAsyncEnumerable<Faculty> GetAllFacultiesAsync()
        {
            var faculties = _context.Faculties
                .OrderBy(f => f.FacultyId).AsAsyncEnumerable();

            await foreach (var faculty in faculties)
            {
                yield return faculty;
            }
        }

        public async IAsyncEnumerable<Faculty> GetUniversityFaculties(int universityId) {
            var faculties = _context.Faculties
                .Where(f => f.UniversityId == universityId)
                .OrderBy(f => f.FacultyId)
                .AsAsyncEnumerable();

            await foreach (var faculty in faculties)
            {
                yield return faculty;
            }
        }

        public async Task<Faculty> GetFacultyByIdAsync(int facultyId)
        {
            return await _context.Faculties
                .Where(f => f.FacultyId.Equals(facultyId))
                .FirstOrDefaultAsync()
                ?? throw new FacultyNotFoundException();

        }
        
        public async Task<Faculty> GetFacultyByUniversityIdAndNameAsync(int universityId, string facultyName)
        {
            return await _context.Faculties
                .Where(f => f.UniversityId == universityId 
                && f.FacultyName.Equals(facultyName))
                .FirstOrDefaultAsync()
                ?? throw new FacultyNotFoundException();

        }

        public async Task CreateFacultyAsync(FacultyCreateModel model)
        {
            Faculty faculty = new()
            {
                UniversityId= model.UniversityId,
                FacultyName= model.FacultyName,
                FacultyDescription = model.Description
            };

            _context.Entry(faculty).State = EntityState.Added;
            await _context.Faculties.AddAsync(faculty);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateFacultyAsync(Faculty faculty, FacultyCreateModel model)
        {
            faculty.FacultyName = model.FacultyName;
            faculty.FacultyDescription = model.Description;

            _context.Entry(faculty).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task DeleteFacultyAsync(Faculty faculty) {
            _context.Entry(faculty).State = EntityState.Deleted;
            _context.Faculties.Remove(faculty);
            await _context.SaveChangesAsync();
        }

        public async Task IncrementCoursesCount(Faculty faculty) {
            faculty.CoursesCount++;
            _context.Entry(faculty).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DecrementCoursesCount(Faculty faculty)
        {
            faculty.CoursesCount--;

            _context.Entry(faculty).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
