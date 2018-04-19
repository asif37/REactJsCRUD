using System;
using System.Collections.Generic;
using System.Linq;

namespace System.Web.Mvc
{
    public interface IPagedList
    {
        int TotalCount
        {
            get;
            set;
        }

        int PageIndex
        {
            get;
            set;
        }

        int PageSize
        {
            get;
            set;
        }

        bool IsPreviousPage
        {
            get;
        }

        bool IsNextPage
        {
            get;
        }     
    }

    public class PagedList<T> : List<T>, IPagedList
    {
        //
        public PagedList(IQueryable<T> source, int index, int pageSize)
        {
            this.TotalCount = source.Count();
            this.PageSize = pageSize;
            this.PageIndex = index;
            //this causes an error w mvc 4
            this.AddRange(source.Skip(index * pageSize).Take(pageSize).ToList());
        }    

        //
        public PagedList(List<T> source, int index, int pageSize)
        {
            if (source != null)
            {
                this.TotalCount = source.Count();
                this.PageSize = pageSize;
                this.PageIndex = index;
                this.AddRange(source.Skip(index * pageSize).Take(pageSize).ToList());
            }
        }

        public int TotalCount      
        { 
            get; set; 
        }
        
        public int PageIndex       
        { 
            get; set; 
        }
        
        public int PageSize 
        { 
            get; set; 
        }

        public bool IsPreviousPage 
        { 
            get 
            {
                return (PageIndex > 0);
            }
        }
        
        public bool IsNextPage 
        { 
            get
            {
                return (PageIndex * PageSize) <=TotalCount;
            } 
        }        
    }//cls

    public static class Pagination
    {
        //
        public static PagedList<T> ToPagedList<T>(this IQueryable<T> source, int index, int pageSize) 
        {
            return new PagedList<T>(source, index, pageSize);
        }
        //
        public static PagedList<T> ToPagedList<T>(this IQueryable<T> source, int index)
        {
            return new PagedList<T>(source, index, 10);
        }
    }//cls

    public class PagedListInfo : IPagedList
    {   //
        /* Initializes pagedListInfo w count and pageIndex = 1*/
        public PagedListInfo(int totalCount, int pageSize = 8)
        {
            this.TotalCount = totalCount;
            this.PageSize = pageSize;
            this.PageIndex = 0;
            this.IsNextPage = (totalCount > pageSize ? true : false);
            this.IsPreviousPage = false;
        }

        public int TotalCount { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public bool IsNextPage { get; set; }
        public bool IsPreviousPage { get; set; }
    }
}//ns
